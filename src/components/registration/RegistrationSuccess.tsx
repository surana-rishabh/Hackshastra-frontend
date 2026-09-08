import * as React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Clock, MapPin, ArrowRight, Share2, Sparkles, MailCheck, Shield, Zap, QrCode, Download, FileDown, Mail, Loader2 } from 'lucide-react';

import { RegistrationFormData } from '@/hooks/useRegistrationForm';
import { POKEMON_OPTIONS } from '@/data/registration/beyondTheScreen';
import { getImageUrl } from '@/lib/assets';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import QRCode from 'qrcode';

// Direct high-resolution clean card templates (bublasaur without text.png, charmander no text.png, squirtlenotext.png)
import bulbasaurCleanImg from '@/assets/events/beyond-the-screen/bulbasaur-clean-card.png';
import charmanderCleanImg from '@/assets/events/beyond-the-screen/charmander-clean-card.png';
import squirtleCleanImg from '@/assets/events/beyond-the-screen/squirtle-clean-card.png';

const CLEAN_CARD_MAP: Record<string, string> = {
  bulbasaur: bulbasaurCleanImg,
  charmander: charmanderCleanImg,
  squirtle: squirtleCleanImg,
};

interface RegistrationSuccessProps {
  formData: RegistrationFormData;
  registrationResult?: any;
  cardBackKey?: string;
  onReset?: () => void;
  className?: string;
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  formData,
  registrationResult,
  cardBackKey = 'card-back.png',
  onReset,
  className,
}) => {
  // Generate a clean entry ID if returned or create an accredited token
  const entryId = registrationResult?.id
    ? `BTS-${String(registrationResult.id).slice(0, 8).toUpperCase()}`
    : `BTS-${Math.floor(100000 + Math.random() * 900000)}`;

  const isPendingVerification = registrationResult?.status === 'PENDING_VERIFICATION' || !registrationResult?.verified_at;

  const selectedPokemon = POKEMON_OPTIONS.find(
    (p) => p.id.toLowerCase() === (formData.favouritePokemon || '').toLowerCase()
  ) || POKEMON_OPTIONS[0];

  // Ref to the physical card DOM element for rendering high-res PNG / PDF
  const cardElementRef = React.useRef<HTMLDivElement>(null);

  // Dynamic Custom Styled QR Code generation holding full trainer verification payload
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>('');
  const [isEmailing, setIsEmailing] = React.useState<boolean>(false);
  const [emailStatus, setEmailStatus] = React.useState<'idle' | 'sending' | 'sent' | 'failed'>('sent');
  const [emailMessage, setEmailMessage] = React.useState<string>(
    formData.email ? `Official Trainer Pass dispatched to ${formData.email}!` : 'Pass confirmed!'
  );
  const [isDownloadingPng, setIsDownloadingPng] = React.useState<boolean>(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = React.useState<boolean>(false);
  const hasAutoDispatched = React.useRef<boolean>(false);

  React.useEffect(() => {
    const qrPayload = JSON.stringify(
      {
        event: 'Beyond the Screen',
        venue: 'CV 402, SRM University-AP',
        date: '16 September 2026',
        passToken: entryId,
        trainerName: formData.fullName || 'Trainer',
        studentId: formData.studentId || 'N/A',
        email: formData.email || 'N/A',
        gender: formData.gender || 'N/A',
        department: formData.department || 'N/A',
        yearOfStudy: formData.year || 'N/A',
        contactNumber: formData.contactNumber || 'N/A',
        battleFormat:
          formData.participationInterest === 'yes'
            ? 'CHALLENGER (Battling)'
            : formData.participationInterest === 'maybe'
            ? 'SCOUT (Exploring)'
            : 'SPECTATOR',
        starterPartner: selectedPokemon.name,
        accreditationStatus: 'OFFICIALLY VERIFIED & LOCKED',
      },
      null,
      2
    );

    const canvas = document.createElement('canvas');
    const size = 440;
    canvas.width = size;
    canvas.height = size;

    QRCode.toCanvas(
      canvas,
      qrPayload,
      {
        width: size,
        margin: 1.5,
        color: {
          dark: '#000000',
          light: '#FBF5DD', // Warm vintage card parchment background
        },
        errorCorrectionLevel: 'H', // High error correction to support larger center emblem seamlessly
      },
      (error) => {
        if (error) {
          console.error('Failed to render base QR to canvas:', error);
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setQrCodeDataUrl(canvas.toDataURL('image/png'));
          return;
        }

        const centerImg = new Image();
        centerImg.crossOrigin = 'anonymous';
        centerImg.src = '/events/beyond-the-screen/qr-center-icon.png';

        centerImg.onload = () => {
          // Expanded Pikachu center area (40% of the entire QR dimension)
          const centerSize = size * 0.40;
          const centerPos = (size - centerSize) / 2;

          ctx.save();
          // Outer circular knockout matching parchment tone with smooth padding
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, centerSize / 2 + 6, 0, Math.PI * 2);
          ctx.fillStyle = '#FBF5DD';
          ctx.fill();
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = '#000000';
          ctx.stroke();

          // Circular clip for emblem
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, centerSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(centerImg, centerPos, centerPos, centerSize, centerSize);
          ctx.restore();

          setQrCodeDataUrl(canvas.toDataURL('image/png'));
        };

        centerImg.onerror = () => {
          // Fallback if emblem is not yet cached
          setQrCodeDataUrl(canvas.toDataURL('image/png'));
        };
      }
    );
  }, [formData, entryId, selectedPokemon]);

  // Helper to generate high-resolution PNG for user manual download
  const generateCardPng = async (pixelRatio = 2.0): Promise<string | null> => {
    if (!cardElementRef.current) return null;
    try {
      console.log(`%c[Trainer Card PNG] Generating card render (pixelRatio: ${pixelRatio})...`, 'color: #3b82f6; font-weight: bold;');
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardElementRef.current, {
        pixelRatio,
        cacheBust: true,
        skipFonts: true,
      });
      console.log(`%c[Trainer Card PNG] ✅ Generated successfully! Data length: ${dataUrl.length} chars`, 'color: #10b981;');
      return dataUrl;
    } catch (err) {
      console.error('[Trainer Card PNG] ❌ Failed to generate PNG from card element:', err);
      return null;
    }
  };

  // Helper to generate card image for client-side PDF pass download
  const generateCardImageForPdf = async (): Promise<string | null> => {
    if (!cardElementRef.current) return null;
    try {
      const { toJpeg } = await import('html-to-image');
      const dataUrl = await toJpeg(cardElementRef.current, {
        quality: 0.8,
        canvasWidth: 500,
        canvasHeight: 710,
        cacheBust: true,
        skipFonts: true,
      });
      return dataUrl;
    } catch (err) {
      console.warn('[Trainer Card PDF] toJpeg fallback to toPng:', err);
      return await generateCardPng(1.0);
    }
  };

  // Helper to generate styled single-page PDF pass with embedded card graphic & QR details
  const generateCardPdf = async (cardDataUrl?: string): Promise<string | null> => {
    try {
      console.log('%c[Trainer Pass PDF] Assembling A4 PDF document...', 'color: #3b82f6; font-weight: bold;');
      const { default: jsPDF } = await import('jspdf');
      const imgUrl = cardDataUrl || (await generateCardImageForPdf());

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Deep dark sleek background
      pdf.setFillColor(10, 15, 20);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Top Event Header Banner
      pdf.setFillColor(220, 38, 38);
      pdf.roundedRect(15, 12, pageWidth - 30, 22, 3, 3, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text('BEYOND THE SCREEN — OFFICIAL ARENA PASS', pageWidth / 2, 22, { align: 'center' });

      pdf.setFontSize(9);
      pdf.setTextColor(254, 240, 138);
      pdf.text('SRM UNIVERSITY-AP  •  VENUE: CV 402  •  16 SEPTEMBER 2026 (2:30 PM)', pageWidth / 2, 29, { align: 'center' });

      let infoY = 45;

      // If card graphic is generated, embed it at top center of PDF
      if (imgUrl) {
        const cardWidth = 105;
        const cardHeight = 105 * 1.42;
        const cardX = (pageWidth - cardWidth) / 2;
        const cardY = 38;
        try {
          const imgFormat = imgUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG';
          pdf.addImage(imgUrl, imgFormat, cardX, cardY, cardWidth, cardHeight, undefined, 'FAST');
          infoY = cardY + cardHeight + 6;
        } catch (e) {
          console.warn('[Trainer Pass PDF] Could not embed card image in PDF:', e);
        }
      }

      // Bottom Pass Details & Verification Box
      pdf.setFillColor(17, 24, 39);
      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(15, infoY, pageWidth - 30, 52, 3, 3, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(245, 158, 11);
      pdf.text('TRAINER ACCREDITATION SUMMARY', 22, infoY + 10);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor(226, 232, 240);
      pdf.text(`Trainer Name: ${formData.fullName || 'Trainer'}`, 22, infoY + 18);
      pdf.text(`Student / Reg ID: ${formData.studentId || 'N/A'}`, 22, infoY + 25);
      pdf.text(`Registered Email: ${formData.email || 'N/A'}`, 22, infoY + 32);
      pdf.text(`Department: ${formData.department || 'N/A'} (Year: ${formData.year || 'N/A'})`, 22, infoY + 39);

      pdf.text(`Starter Partner: ${selectedPokemon.name}`, pageWidth / 2 + 5, infoY + 18);
      pdf.text(`Battle Role: ${formData.participationInterest === 'yes' ? 'Challenger (Battling)' : 'Participant'}`, pageWidth / 2 + 5, infoY + 25);
      pdf.text(`Pass ID: ${entryId}`, pageWidth / 2 + 5, infoY + 32);
      pdf.text(`Status: OFFICIALLY CONFIRMED & VERIFIED`, pageWidth / 2 + 5, infoY + 39);

      // Embed QR code into details box if ready
      if (qrCodeDataUrl) {
        try {
          const qrSize = 34;
          const qrX = pageWidth - 15 - 34 - 4;
          pdf.addImage(qrCodeDataUrl, 'PNG', qrX, infoY + 12, qrSize, qrSize);
        } catch (e) {
          // ignore
        }
      }

      // Security footer
      pdf.setFontSize(7.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text('HackShastra SRM-AP Chapter • Please present this ticket or QR card upon entry at CV 402', pageWidth / 2, pageHeight - 10, { align: 'center' });

      console.log('%c[Trainer Pass PDF] ✅ PDF generated successfully!', 'color: #10b981;');
      return pdf.output('datauristring');
    } catch (err) {
      console.error('[Trainer Pass PDF] ❌ Failed to generate PDF pass:', err);
      return null;
    }
  };

  // Dispatch Email function (called automatically or on button click)
  const handleEmailPass = async (silent = false) => {
    if (!formData.email) return;
    if (isEmailing) return;

    try {
      setIsEmailing(true);
      if (!silent) setEmailStatus('sending');

      console.log(`%c[Pass Email] Dispatching pass #${entryId} to ${formData.email}...`, 'color: #f59e0b; font-weight: bold;');

      // Send lightweight metadata payload - backend handles full server-side pass generation & dispatch
      const res = await api.post('/api/registrations/send-pass', {
        email: formData.email,
        registrationId: registrationResult?.id || undefined,
        fullName: formData.fullName,
        eventTitle: 'Beyond the Screen',
        passId: entryId,
        pokemonName: selectedPokemon.name,
      });

      if (res.success) {
        console.log(`%c[Pass Email] ✅ Email dispatched successfully to ${formData.email}`, 'color: #10b981; font-weight: bold;', res);
        setEmailStatus('sent');
        setEmailMessage(`Official Trainer Pass dispatched to ${formData.email}!`);
      } else {
        console.warn(`[Pass Email] ⚠️ Delivery notice for ${formData.email}:`, res.message);
        setEmailStatus('failed');
        setEmailMessage(res.message || `Failed to deliver pass to ${formData.email}. Please use the download buttons below.`);
      }
    } catch (err: any) {
      console.error('[Pass Email] ❌ Dispatch error:', err);
      setEmailStatus('failed');
      setEmailMessage(err.message || `Could not deliver pass email. You can save your PNG card and PDF pass directly below.`);
    } finally {
      setIsEmailing(false);
    }
  };

  // Automatically trigger email dispatch once QR is ready
  React.useEffect(() => {
    if (qrCodeDataUrl && !hasAutoDispatched.current && formData.email) {
      hasAutoDispatched.current = true;
      console.log('[Pass Email] Auto-dispatching pass email upon QR completion...');
      // Slight timeout to let DOM render completely
      const timer = setTimeout(() => {
        handleEmailPass(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [qrCodeDataUrl, formData.email]);

  // Download Card as high-res PNG image
  const handleDownloadPng = async () => {
    try {
      setIsDownloadingPng(true);
      console.log('[Download] Initiating PNG Card download...');
      const pngDataUrl = await generateCardPng(2.5);
      if (!pngDataUrl) throw new Error('Could not generate PNG');

      const link = document.createElement('a');
      link.download = `${(formData.fullName || 'Trainer').replace(/\s+/g, '_')}_${selectedPokemon.name}_Card.png`;
      link.href = pngDataUrl;
      link.click();
      console.log(`[Download] ✅ PNG card downloaded: ${link.download}`);
    } catch (err) {
      console.error('[Download] ❌ Download PNG failed:', err);
      alert('Failed to download PNG. Please try again.');
    } finally {
      setIsDownloadingPng(false);
    }
  };

  // Download Pass as full PDF ticket
  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      console.log('[Download] Initiating PDF Ticket download...');
      const pdfDataUrl = await generateCardPdf();
      if (!pdfDataUrl) throw new Error('Could not generate PDF');

      const link = document.createElement('a');
      link.download = `${(formData.fullName || 'Trainer').replace(/\s+/g, '_')}_Beyond_The_Screen_Pass.pdf`;
      link.href = pdfDataUrl;
      link.click();
      console.log(`[Download] ✅ PDF pass downloaded: ${link.download}`);
    } catch (err) {
      console.error('[Download] ❌ Download PDF failed:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Beyond the Screen Registration Deck',
          text: `I just registered my trainer deck with ${selectedPokemon.name} for Beyond the Screen at SRM University-AP!`,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event registration link copied to clipboard!');
    }
  };

  // Type-specific color matching themes
  const pokemonTheme = React.useMemo(() => {
    const pId = (selectedPokemon.id || '').toLowerCase();
    if (pId === 'bulbasaur') {
      return {
        primary: '#14532d', // Deep grass green
        accent: '#15803d',  // Emerald
        subtext: '#1f2937', // Slate
        badgeBg: '#dcfce7',
        badgeText: '#14532d',
        badgeBorder: '#86efac',
        divider: 'rgba(20, 83, 45, 0.28)',
        qrBorder: '#166534',
        footerText: '#166534',
      };
    }
    if (pId === 'charmander') {
      return {
        primary: '#991b1b', // Deep flame crimson
        accent: '#c2410c',  // Fire orange
        subtext: '#1f2937',
        badgeBg: '#ffedd5',
        badgeText: '#9a3412',
        badgeBorder: '#fdba74',
        divider: 'rgba(153, 27, 27, 0.28)',
        qrBorder: '#991b1b',
        footerText: '#9a3412',
      };
    }
    // Default to Squirtle (Water)
    return {
      primary: '#075985', // Deep ocean navy
      accent: '#30C192',  // Cobalt cyan
      subtext: '#1f2937',
      badgeBg: '#e0f2fe',
      badgeText: '#0369a1',
      badgeBorder: '#7dd3fc',
      divider: 'rgba(7, 89, 133, 0.28)',
      qrBorder: '#0369a1',
      footerText: '#0369a1',
    };
  }, [selectedPokemon]);

  // Card background asset logic using direct clean image imports
  const cardArtUrl =
    CLEAN_CARD_MAP[(selectedPokemon.id || '').toLowerCase()] ||
    getImageUrl(selectedPokemon.cleanImageKey || selectedPokemon.imageKey);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={cn('w-full max-w-[480px] sm:max-w-[530px] mx-auto text-center space-y-4', className)}
    >
      {/* 3D Collectible Partner Card with Natural In-Card Lower Half Typography & QR */}
      <div
        className="relative rounded-[22px] sm:rounded-[26px] bg-[#0A0306]/95 backdrop-blur-2xl border-2 shadow-2xl p-2 sm:p-2.5 overflow-hidden text-black transition-all duration-500"
        style={{
          borderColor: `${selectedPokemon.typeColor}95`,
          boxShadow: `0 24px 60px -12px rgba(0, 0, 0, 0.85), 0 0 40px ${selectedPokemon.typeColor}40`,
        }}
      >
        {/* Ambient elemental atmospheric glow */}
        <div
          className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-500"
          style={{ backgroundColor: selectedPokemon.typeColor }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-30 transition-colors duration-500"
          style={{ backgroundColor: selectedPokemon.typeColor }}
        />

        {/* PHYSICAL POKÉMON CARD CONTAINER (Anchored 1:1.42 card frame) */}
        <div
          ref={cardElementRef}
          className="relative rounded-[16px] sm:rounded-[18px] overflow-hidden border-2 border-amber-900/30 shadow-2xl aspect-[1/1.42] w-full select-none"
        >
          {/* Base Card Artwork Template (Artwork & Species info untouched) */}
          <img
            src={cardArtUrl}
            alt={`${selectedPokemon.name} Card`}
            className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
          />

          {/* ALL TRAINER DETAILS ANCHORED IN LOWER HALF SECTION (53.5% - 90% height) */}
          <div className="absolute top-[53.5%] bottom-[5%] left-[5%] right-[5%] flex flex-col justify-between text-black pointer-events-none z-10 px-2 sm:px-2.5 py-1.5 sm:py-2">
            
            {/* 1. TRAINER IDENTITY & ACADEMIC INFO (Upper Attack Slot) */}
            <div
              className="text-left pb-1.5 sm:pb-2 space-y-1"
              style={{ borderBottom: `1.5px solid ${pokemonTheme.divider}` }}
            >
              <div className="flex items-baseline justify-between gap-1">
                <span
                  className="font-pokemon text-[18px] sm:text-[22px] tracking-wide uppercase leading-none truncate drop-shadow-xs"
                  style={{ color: pokemonTheme.primary }}
                >
                  {formData.fullName || 'TRAINER'}
                </span>
                <span
                  className="font-pokemon text-[14px] sm:text-[16.5px] shrink-0 uppercase tracking-wider font-bold"
                  style={{ color: pokemonTheme.accent }}
                >
                  {formData.year || '2026'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11.5px] sm:text-[14px] font-sans font-bold leading-tight">
                <span style={{ color: pokemonTheme.subtext }}>
                  AP ID: <strong className="font-mono text-black font-extrabold text-[12px] sm:text-[14.5px]">{formData.studentId || entryId}</strong>
                </span>
                <span
                  className="truncate max-w-[55%] text-right font-extrabold uppercase text-[11px] sm:text-[13.5px]"
                  style={{ color: pokemonTheme.accent }}
                >
                  {formData.department || 'SRM University-AP'}
                </span>
              </div>
            </div>

            {/* 2. BATTLE CLEARANCE & COMMS + BOTTOM CORNER QR CODE (Lower Attack Slot) */}
            <div className="flex items-center justify-between gap-2.5 py-1 sm:py-1.5">
              {/* Comms & Clearance details */}
              <div className="text-left space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                <div
                  className="font-pokemon text-[15px] sm:text-[18px] tracking-wide uppercase leading-tight"
                  style={{ color: pokemonTheme.primary }}
                >
                  {formData.participationInterest === 'yes'
                    ? 'BATTLE CHALLENGER'
                    : formData.participationInterest === 'maybe'
                    ? 'POKEMON SCOUT'
                    : 'ARENA SPECTATOR'}
                </div>
                <div
                  className="font-sans font-bold text-[11px] sm:text-[13.5px] leading-snug truncate"
                  style={{ color: pokemonTheme.subtext }}
                >
                  {formData.email || 'trainer@srmap.edu.in'}
                </div>
                <div
                  className="font-sans font-semibold text-[10.5px] sm:text-[12.5px] leading-snug"
                  style={{ color: pokemonTheme.subtext }}
                >
                  {formData.contactNumber ? `Ph: ${formData.contactNumber} • ` : ''}{formData.gender || 'Trainer'}
                </div>
                <div
                  className="font-mono text-[8.5px] sm:text-[10.5px] font-black px-2 py-0.5 rounded-md w-fit mt-1 border shadow-xs"
                  style={{
                    backgroundColor: pokemonTheme.badgeBg,
                    color: pokemonTheme.badgeText,
                    borderColor: pokemonTheme.badgeBorder,
                  }}
                >
                  PASS: {entryId}
                </div>
              </div>

              {/* Custom Styled QR Code in bottom right corner (Maintained Size with Pikachu Emblem) */}
              <div className="shrink-0 flex flex-col items-center pointer-events-auto pl-1">
                <div
                  className="p-1 rounded-[7px] border-2 shadow-md"
                  style={{
                    borderColor: pokemonTheme.qrBorder,
                    backgroundColor: '#FBF5DD',
                  }}
                >
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="Trainer Pass QR Code"
                      className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] object-contain"
                    />
                  ) : (
                    <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] flex items-center justify-center bg-[#FBF5DD]">
                      <QrCode className="w-8 h-8 text-black" />
                    </div>
                  )}
                </div>
                <span
                  className="font-pokemon text-[9.5px] sm:text-[11.5px] tracking-wider mt-1 uppercase font-bold"
                  style={{ color: pokemonTheme.footerText }}
                >
                  SCAN PASS
                </span>
              </div>
            </div>

            {/* 3. EVENT FOOTER STAMP */}
            <div
              className="flex items-center justify-between pt-1 sm:pt-1.5 text-[9px] sm:text-[11px] font-bold"
              style={{
                borderTop: `1.5px solid ${pokemonTheme.divider}`,
                color: pokemonTheme.footerText,
              }}
            >
              <span className="font-sans font-extrabold uppercase tracking-tight">VENUE: CV 402, SRM-AP</span>
              <span className="font-pokemon tracking-wide">16 SEP 2026 (2:30 PM)</span>
            </div>

          </div>
        </div>
      </div>

      {/* Email Delivery Status Alert */}
      {emailStatus === 'sending' && (
        <div className="p-3 rounded-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center justify-center gap-2 backdrop-blur-md">
          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          <span>Generating PNG & PDF pass and emailing to {formData.email}...</span>
        </div>
      )}

      {emailStatus === 'sent' && (
        <div className="p-3 rounded-[8px] bg-emerald-950/80 border border-emerald-400/50 text-emerald-200 font-mono text-xs flex items-start gap-2.5 text-left backdrop-blur-md shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-emerald-300 font-pokemon tracking-wide">TRAINER PASS EMAILED SUCCESSFULLY! 📬</div>
            <p className="text-[11px] text-emerald-100 mt-0.5">
              {emailMessage || `Your collectible PNG card and PDF pass have been sent to ${formData.email}. Check your inbox!`}
            </p>
          </div>
        </div>
      )}

      {emailStatus === 'failed' && (
        <div className="p-3 rounded-[8px] bg-rose-950/80 border border-rose-400/50 text-rose-200 font-mono text-xs flex items-start gap-2.5 text-left backdrop-blur-md">
          <Mail className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-rose-300 font-pokemon tracking-wide">AUTOMATIC EMAIL NOTICE</div>
            <p className="text-[11px] text-rose-100 mt-0.5">
              {emailMessage}
            </p>
          </div>
        </div>
      )}

      {/* Verification notice if applicable */}
      {isPendingVerification && emailStatus === 'idle' && (
        <div className="p-3.5 rounded-[6px] bg-sky-950/80 border border-sky-400/50 text-sky-200 font-mono text-xs flex items-start gap-2.5 text-left backdrop-blur-md shadow-md">
          <MailCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sky-300 font-pokemon tracking-wide">VERIFICATION CONFIRMATION DISPATCHED</div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              We have transmitted your trainer credentials and pass confirmation to <strong>{formData.email}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Primary Action Buttons: Download PNG, Download PDF, Email Pass */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <Button
          onClick={handleDownloadPng}
          disabled={isDownloadingPng}
          variant="outline"
          className="w-full font-mono text-xs bg-black/60 border-white/30 text-white hover:border-[#FFCC03] hover:text-[#FFCC03] gap-1.5 cursor-pointer shadow-md"
        >
          {isDownloadingPng ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
          ) : (
            <Download className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>SAVE PNG CARD</span>
        </Button>

        <Button
          onClick={handleDownloadPdf}
          disabled={isDownloadingPdf}
          variant="outline"
          className="w-full font-mono text-xs bg-black/60 border-white/30 text-white hover:border-[#FFCC03] hover:text-[#FFCC03] gap-1.5 cursor-pointer shadow-md"
        >
          {isDownloadingPdf ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
          ) : (
            <FileDown className="w-3.5 h-3.5 text-sky-400" />
          )}
          <span>DOWNLOAD PDF</span>
        </Button>

        <Button
          onClick={() => handleEmailPass(false)}
          disabled={isEmailing}
          variant="outline"
          className="w-full font-mono text-xs bg-black/60 border-white/30 text-white hover:border-[#FFCC03] hover:text-[#FFCC03] gap-1.5 cursor-pointer shadow-md"
        >
          {isEmailing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          ) : (
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span>RESEND EMAIL</span>
        </Button>
      </div>

      {/* Secondary Actions: Share & Explore Events */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full sm:w-auto font-mono text-xs border-white/30 text-white hover:border-[#FFCC03] gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400" />
          <span>SHARE TRAINER CARD</span>
        </Button>

        <Link to="/events" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full font-mono text-xs gap-1.5">
            <span>EXPLORE ALL EVENTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-mono text-slate-400 hover:text-amber-300 underline cursor-pointer"
        >
          Register another trainer deck
        </button>
      )}
    </motion.div>
  );
};
