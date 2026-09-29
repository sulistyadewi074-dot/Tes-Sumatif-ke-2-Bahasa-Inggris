import React, { useState, useMemo } from 'react';
import { CONFIG } from '../config';
import {
  Question,
  ShuffledQuestion,
  StudentIdentity,
  AnswerValue,
  ExamResult,
  OptionItem,
} from '../types';
import { gasService } from '../services/gasService';
import { downloadExamQuestionsPDF } from '../utils/pdfGenerator';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  User,
  Check,
  RefreshCw,
  Hash,
  PenTool,
  CheckSquare,
  ListOrdered,
} from 'lucide-react';

interface Stage2ExamProps {
  student: StudentIdentity;
  questions: Question[];
  onFinishExam: (result: ExamResult) => void;
}

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Stage2Exam: React.FC<Stage2ExamProps> = ({
  student,
  questions,
  onFinishExam,
}) => {
  // 1. Acak urutan soal dan opsi jawaban setiap kali tes dimulai
  const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
    // Acak urutan butir soal
    const shuffledQ: Question[] = shuffleArray<Question>(questions);

    return shuffledQ.map((q: Question) => {
      if (q.type === 'pg' || q.type === 'pgk') {
        if (q.options && q.options.length > 0) {
          // Acak opsi jawaban tetapi beri label baru A, B, C, D yang rapi
          const shuffledOpts: OptionItem[] = shuffleArray<OptionItem>(q.options);
          const standardLabels = ['A', 'B', 'C', 'D'];
          const remappedOptions: OptionItem[] = shuffledOpts.map((opt, idx) => ({
            id: standardLabels[idx] || opt.id,
            text: opt.text,
          }));

          return {
            ...q,
            originalQuestionId: q.id,
            shuffledOptions: remappedOptions,
          };
        }
      }
      return {
        ...q,
        originalQuestionId: q.id,
      };
    });
  }, [questions]);

  // State pengerjaan
  const [currentIndex, setCurrentIndex] = useState(0);
  // Answers state keyed by question index (0 to totalQuestions - 1)
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  // Konfirmasi kirim modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Status pengiriman
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentQ = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  // Cek apakah soal nomor tertentu sudah dijawab
  const isQuestionAnswered = (idx: number): boolean => {
    const ans = answers[idx];
    if (ans === undefined || ans === null) return false;

    const q = shuffledQuestions[idx];
    if (q.type === 'pg') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    if (q.type === 'isian') {
      return typeof ans === 'string' && ans.trim().length > 0;
    }
    if (q.type === 'pgk') {
      return Array.isArray(ans) && ans.length > 0;
    }
    if (q.type === 'pgk_kategori') {
      if (typeof ans === 'object' && !Array.isArray(ans)) {
        const statements = q.statements || [];
        return statements.length > 0 && statements.every((st) => ans[st.id] !== undefined);
      }
      return false;
    }
    return false;
  };

  // Hitung jumlah soal yang telah dijawab
  const answeredCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (isQuestionAnswered(i)) count++;
    }
    return count;
  }, [answers, totalQuestions, shuffledQuestions]);

  const allAnswered = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Handler jawaban Pilihan Ganda (PG)
  const handleSelectPG = (optionText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionText,
    }));
  };

  // Handler jawaban Isian Singkat
  const handleSetIsian = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: text,
    }));
  };

  // Handler jawaban Pilihan Ganda Kompleks (PGK)
  const handleTogglePGK = (optionText: string) => {
    setAnswers((prev) => {
      const currentList = Array.isArray(prev[currentIndex]) ? (prev[currentIndex] as string[]) : [];
      if (currentList.includes(optionText)) {
        return {
          ...prev,
          [currentIndex]: currentList.filter((item) => item !== optionText),
        };
      } else {
        return {
          ...prev,
          [currentIndex]: [...currentList, optionText],
        };
      }
    });
  };

  // Handler jawaban PGK Kategori (Benar/Salah, Sesuai/Tidak Sesuai, Setuju/Tidak Setuju)
  const handleSetCategoryStatement = (statementId: string, value: boolean) => {
    setAnswers((prev) => {
      const currentMap =
        typeof prev[currentIndex] === 'object' && !Array.isArray(prev[currentIndex])
          ? { ...(prev[currentIndex] as Record<string, boolean>) }
          : {};
      currentMap[statementId] = value;
      return {
        ...prev,
        [currentIndex]: currentMap,
      };
    });
  };

  // Navigasi soal
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  // Hitung Nilai & Validasi Akhir
  const calculateResult = (): ExamResult => {
    let totalScore = 0;
    let benarCount = 0;

    shuffledQuestions.forEach((sq, idx) => {
      const userAns = answers[idx];
      // Cari soal original untuk periksa kunci jawaban
      const origQ = questions.find((q) => q.id === sq.originalQuestionId) || sq;

      if (sq.type === 'pg') {
        // Cocokkan teks opsi yang dipilih dengan teks opsi dari kunci jawaban original
        const correctOpt = origQ.options?.find((o) => o.id === origQ.correctAnswer);
        if (correctOpt && userAns === correctOpt.text) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'isian') {
        // Cocokkan jawaban teks dengan toleransi huruf besar/kecil & spasi
        const userStr = String(userAns || '').trim().toLowerCase();
        const acceptableList: string[] = [
          ...(typeof origQ.correctAnswer === 'string' ? [origQ.correctAnswer] : []),
          ...(Array.isArray(origQ.correctAnswer) ? origQ.correctAnswer : []),
          ...(origQ.acceptableAnswers || []),
        ]
          .filter(Boolean)
          .map((s) => s.trim().toLowerCase());

        if (userStr && acceptableList.some((accepted) => userStr === accepted || userStr.includes(accepted) || accepted.includes(userStr))) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'pgk') {
        // Jawaban benar bisa lebih dari satu
        const correctKeys = Array.isArray(origQ.correctAnswer) ? origQ.correctAnswer : [];
        const correctTexts = (origQ.options || [])
          .filter((o) => correctKeys.includes(o.id))
          .map((o) => o.text);

        const userSelected = Array.isArray(userAns) ? userAns : [];
        const isMatch =
          correctTexts.length === userSelected.length &&
          correctTexts.every((txt) => userSelected.includes(txt));

        if (isMatch) {
          totalScore += 1;
          benarCount += 1;
        }
      } else if (sq.type === 'pgk_kategori') {
        // Kumpulan pernyataan
        const statements = origQ.statements || [];
        const userMap = (typeof userAns === 'object' && !Array.isArray(userAns) ? userAns : {}) as Record<string, boolean>;

        let statementsCorrect = 0;
        statements.forEach((st) => {
          if (userMap[st.id] === st.correctAnswer) {
            statementsCorrect += 1;
          }
        });

        if (statementsCorrect === statements.length) {
          totalScore += 1;
          benarCount += 1;
        } else {
          // Memberi bobot proporsional untuk nilai akhir
          totalScore += statementsCorrect / statements.length;
        }
      }
    });

    // Skala 0 - 100
    const finalScore = Math.round((totalScore / totalQuestions) * 100);
    const salahCount = totalQuestions - benarCount;
    const status: 'Lulus' | 'Belum Lulus' = finalScore >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus';

    const tglLahirStr = student.tglLahir?.hari && student.tglLahir?.bulan && student.tglLahir?.tahun
      ? `${student.tglLahir.hari} ${student.tglLahir.bulan} ${student.tglLahir.tahun}`
      : '-';

    return {
      id: `res-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      nama: student.nama,
      noAbsen: student.noAbsen,
      kelas: CONFIG.KELAS,
      tglLahir: tglLahirStr,
      benar: benarCount,
      salah: salahCount,
      nilai: finalScore,
      status,
      detailJawaban: answers,
    };
  };

  // Proses Kirim Jawaban ke Google Apps Script
  const handleConfirmSubmit = async () => {
    // Validasi ulang semua soal terjawab
    if (!allAnswered) {
      alert(`Masih ada ${totalQuestions - answeredCount} butir soal yang belum dijawab. Harap jawab seluruh soal terlebih dahulu!`);
      setShowConfirmModal(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = calculateResult();

    try {
      // Kirim hasil tes otomatis ke Google Apps Script / Spreadsheet
      await gasService.submitExamResult(result);
      setIsSubmitting(false);
      setShowConfirmModal(false);
      onFinishExam(result);
    } catch (err: any) {
      console.warn('Gagal sinkronisasi cloud, tetap simpan lokal dan lanjut ke hasil:', err);
      setIsSubmitting(false);
      setShowConfirmModal(false);
      onFinishExam(result);
    }
  };

  // Label respon kategori
  const getCategoryLabels = (type?: string) => {
    if (type === 'setuju_tidak_setuju') {
      return { positive: 'Setuju', negative: 'Tidak Setuju' };
    }
    if (type === 'sesuai_tidak_sesuai') {
      return { positive: 'Sesuai', negative: 'Tidak Sesuai' };
    }
    return { positive: 'Benar', negative: 'Salah' };
  };

  const categoryLabels = getCategoryLabels(currentQ.categoryResponseType);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Bar Informasi Siswa & Progres Ujian */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {student.nama}
              </h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-medium">
                <span>No. Absen: <strong>{student.noAbsen}</strong></span>
                <span>•</span>
                <span>Kelas: <strong>{CONFIG.KELAS}</strong></span>
                <span>•</span>
                <span>{CONFIG.MATA_PELAJARAN}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-download-soal-pdf"
              type="button"
              onClick={() => downloadExamQuestionsPDF(questions)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300 cursor-pointer"
              title="Unduh Naskah Soal Lengkap dalam format PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Soal (PDF)</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Tes Aktif</span>
            </span>
          </div>
        </div>

        {/* Indikator Progres Soal */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>
              Progres Pengerjaan: <strong className="text-blue-700">{answeredCount}</strong> dari {totalQuestions} Soal Terjawab
            </span>
            <span className="text-blue-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Grid Nomor Soal (Navigasi Cepat) */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600">Navigasi Butir Soal:</span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                Sudah dijawab
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300 inline-block"></span>
                Belum
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
            {shuffledQuestions.map((q, idx) => {
              const isAnswered = isQuestionAnswered(idx);
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'ring-2 ring-blue-600 ring-offset-1 bg-blue-600 text-white shadow-xs'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                  title={`Soal No. ${idx + 1} (${isAnswered ? 'Sudah dijawab' : 'Belum dijawab'})`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Compact Bar Progres Soal saat siswa menggulir layar */}
      <div className="sticky top-2 z-20 mb-4">
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl px-4 py-2.5 shadow-md border border-slate-700/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-slate-100">
              Soal {currentIndex + 1} <span className="text-slate-400 font-normal">dari {totalQuestions}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span>{answeredCount} dari {totalQuestions} Soal Terjawab ({progressPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Card Utama Soal yang Sedang Dikerjakan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative mb-6">
        {/* Header Soal: Tipe Soal & Indikator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-xs">
              Soal Nomor {currentIndex + 1}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              {currentQ.type === 'pg' && 'Pilihan Ganda (PG)'}
              {currentQ.type === 'pgk' && 'Pilihan Ganda Kompleks (Bisa >1 Jawaban)'}
              {currentQ.type === 'pgk_kategori' && `Kategori (${categoryLabels.positive} / ${categoryLabels.negative})`}
              {currentQ.type === 'isian' && 'Isian Singkat'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
              {currentQ.topic}
            </span>
            {isQuestionAnswered(currentIndex) ? (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Terjawab
              </span>
            ) : (
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Belum Terjawab
              </span>
            )}
          </div>
        </div>

        {/* Teks Pertanyaan Soal */}
        <div className="text-slate-900 text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line mb-5">
          {currentQ.text}
        </div>

        {/* Diagram SVG Ilustrasi jika ada */}
        {currentQ.imageSvg && (
          <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 overflow-x-auto flex justify-center">
            <div
              className="w-full flex justify-center items-center"
              dangerouslySetInnerHTML={{ __html: currentQ.imageSvg }}
            />
          </div>
        )}

        {/* Opsi / Input Berdasarkan Jenis Soal */}
        <div className="mt-6">
          {/* 1. Tipe PILIHAN GANDA (PG) */}
          {currentQ.type === 'pg' && currentQ.shuffledOptions && (
            <div className="space-y-3">
              {currentQ.shuffledOptions.map((opt) => {
                const isSelected = answers[currentIndex] === opt.text;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectPG(opt.text)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span
                      className={`text-xs sm:text-sm pt-0.5 leading-snug ${
                        isSelected ? 'font-bold text-blue-950' : 'text-slate-800 font-medium'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Tipe PILIHAN GANDA KOMPLEKS (PGK) */}
          {currentQ.type === 'pgk' && currentQ.shuffledOptions && (
            <div>
              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Petunjuk: Beri tanda centang pada satu atau lebih pilihan yang kamu anggap benar.</span>
              </p>
              <div className="space-y-3">
                {currentQ.shuffledOptions.map((opt) => {
                  const selectedList = Array.isArray(answers[currentIndex])
                    ? (answers[currentIndex] as string[])
                    : [];
                  const isChecked = selectedList.includes(opt.text);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleTogglePGK(opt.text)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <span
                          className={`text-xs sm:text-sm leading-snug ${
                            isChecked ? 'font-bold text-emerald-950' : 'text-slate-800 font-medium'
                          }`}
                        >
                          <strong className="text-slate-600 mr-2">{opt.id}.</strong>
                          {opt.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Tipe PGK KATEGORI (Benar/Salah, Sesuai/Tidak Sesuai, Setuju/Tidak Setuju) */}
          {currentQ.type === 'pgk_kategori' && currentQ.statements && (
            <div>
              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>
                  Petunjuk: Tentukan respon ({categoryLabels.positive} atau {categoryLabels.negative}) untuk setiap pernyataan di bawah ini.
                </span>
              </p>
              <div className="space-y-3">
                {currentQ.statements.map((st, sIdx) => {
                  const currentMap =
                    typeof answers[currentIndex] === 'object' && !Array.isArray(answers[currentIndex])
                      ? (answers[currentIndex] as Record<string, boolean>)
                      : {};
                  const userChoice = currentMap[st.id];

                  return (
                    <div
                      key={st.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                          {st.text}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        {/* Tombol Positif (Benar / Sesuai / Setuju) */}
                        <button
                          type="button"
                          onClick={() => handleSetCategoryStatement(st.id, true)}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            userChoice === true
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50'
                          }`}
                        >
                          {categoryLabels.positive}
                        </button>

                        {/* Tombol Negatif (Salah / Tidak Sesuai / Tidak Setuju) */}
                        <button
                          type="button"
                          onClick={() => handleSetCategoryStatement(st.id, false)}
                          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            userChoice === false
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-rose-50'
                          }`}
                        >
                          {categoryLabels.negative}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Tipe ISIAN SINGKAT */}
          {currentQ.type === 'isian' && (
            <div>
              <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
                <PenTool className="w-4 h-4 text-purple-600" />
                <span>Petunjuk: Ketikkan istilah atau kata jawaban singkat yang paling tepat pada kotak di bawah.</span>
              </p>
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200">
                <label
                  htmlFor={`input-isian-${currentIndex}`}
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Jawaban Anda:
                </label>
                <div className="relative">
                  <input
                    id={`input-isian-${currentIndex}`}
                    type="text"
                    value={typeof answers[currentIndex] === 'string' ? (answers[currentIndex] as string) : ''}
                    onChange={(e) => handleSetIsian(e.target.value)}
                    placeholder="Ketik jawaban singkat Anda di sini (contoh: Alveolus / Diafragma)..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold text-slate-800 text-sm sm:text-base placeholder:text-slate-400 shadow-xs"
                    autoComplete="off"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Tips: Perhatikan ejaan kata kunci ilmiah dengan teliti.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigasi: Sebelumnya, Berikutnya, Selesai */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100 gap-3">
          <button
            id="btn-prev-question"
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              currentIndex === 0
                ? 'text-slate-300 bg-slate-100 cursor-not-allowed border border-slate-200'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer border border-slate-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < totalQuestions - 1 ? (
              <button
                id="btn-next-question"
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-finish-exam"
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={!allAnswered}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md ${
                  allAnswered
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:shadow-lg'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
                title={
                  allAnswered
                    ? 'Kirim seluruh jawaban'
                    : `Masih ada ${totalQuestions - answeredCount} butir soal yang belum dijawab`
                }
              >
                <Send className="w-4 h-4" />
                <span>Selesai / Kirim Jawaban</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifikasi jika berada di soal terakhir dan belum lengkap */}
        {currentIndex === totalQuestions - 1 && !allAnswered && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              Anda belum dapat mengirimkan tes karena masih ada <strong>{totalQuestions - answeredCount}</strong> butir soal yang belum terjawab. Silakan periksa kembali melalui kotak nomor navigasi di atas.
            </span>
          </div>
        )}
      </div>

      {/* MODAL KONFIRMASI PENGIRIMAN JAWABAN */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
              Konfirmasi Pengiriman Jawaban
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Apakah Anda yakin ingin mengirim jawaban?
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Siswa:</span>
                <span className="font-bold text-slate-800">{student.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Absen:</span>
                <span className="font-bold text-slate-800">{student.noAbsen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Soal Terjawab:</span>
                <span className="font-bold text-emerald-700">{answeredCount} dari {totalQuestions} Soal</span>
              </div>
            </div>

            {submitError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs text-left">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Periksa Lagi
              </button>
              <button
                id="btn-confirm-final-submit"
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <span>Ya, Kirim Sekarang</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
