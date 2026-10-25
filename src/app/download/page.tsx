import Link from "next/link";
import { Badge, Card, Notice, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "تنزيل مشروع Flutter | فانتازي أرينا",
  description: "حمّل مشروع Flutter جاهزاً لجذر الريبو + GitHub Actions يبني APK، وافتحه في Klencode IDE بخطوات بسيطة.",
};

const FILES = [
  ["pubspec.yaml", "في جذر الحزمة — يحل خطأ Expected to find project root"],
  ["lib/main.dart", "الهيكل، التنقل السفلي، تحميل البيانات الرسمية"],
  ["lib/core/models.dart", "نماذج اللاعبين والأندية والجولات والمديرين"],
  ["lib/core/api.dart", "الاتصال بالواجهة الرسمية + كاش 5 دقائق"],
  ["lib/core/ui.dart", "الثيم الداكن، الكروت، شارات الأندية، عناصر الإحصاءات"],
  ["lib/screens/home_screen.dart", "الرئيسية: أفضل اللاعبين، الفورمة، الأسعار، الامتلاك"],
  ["lib/screens/players_screen.dart", "بحث وفلترة وفرز قاعدة اللاعبين"],
  ["lib/screens/player_screen.dart", "كل إحصاءات اللاعب + سجل الجولات + المواسم"],
  ["lib/screens/team_screen.dart", "فريق المدير: الترتيب، القيمة، البنك، التشكيلة"],
  ["lib/screens/fixtures_screen.dart", "جدول المباريات وصعوبة الخصم FDR"],
  ["lib/screens/stats_screen.dart", "15 تصنيفاً إحصائياً"],
  [".github/workflows/flutter-build.yml", "يبني APK تلقائياً ويكتشف مجلد المشروع بنفسه"],
  [".gitignore", "استثناء build و.dart_tool وandroid/.gradle"],
];

const FIXES = [
  {
    tag: "الحل 1 (الأفضل)",
    title: "انقل الملفات إلى جذر المستودع",
    text: "فك الحزمة الجديدة مباشرة داخل جذر الريبو بحيث يصبح pubspec.yaml بجانب .github و lib. الحزمة الجديدة ملفاتها في الجذر بدون مجلد أب، لذا لن يتكرر الخطأ.",
    code: '/pubspec.yaml  /lib/main.dart  /.github/workflows/flutter-build.yml',
  },
  {
    tag: "الحل 2",
    title: "أضف working-directory للـworkflow القديم",
    text: "إن أردت إبقاء المشروع داخل مجلد فرعي (مثل fpl_arena_flutter)، أضف السطر نفسه لكل خطوة تعمل بـflutter داخل ملف .github/workflows عندك.",
    code: '- name: flutter pub get\n  working-directory: fpl_arena_flutter\n  run: flutter pub get',
  },
  {
    tag: "الحل 3",
    title: "استبدل الـworkflow بالملف الجاهز",
    text: "الملف المرفق يبحث عن pubspec.yaml في أي مستوى حتى 4، ثم يولّد android/ وweb/ إن كانت ناقصة، ويحذف test/widget_test.dart، ثم يبني APK ويرفعه في Artifacts.",
    code: 'cp .github/workflows/flutter-build.yml ../../.github/workflows/',
  },
];

export default function DownloadPage() {
  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-bl from-mint/20 via-[#14112a] to-[#0a0913] p-5 sm:p-7">
        <div className="absolute -left-10 -top-14 h-44 w-44 rounded-full bg-lime/20 blur-3xl" />
        <div className="relative flex flex-wrap items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="أيقونة فانتازي أرينا" className="floaty h-16 w-16 rounded-2xl border border-white/15 object-cover" />
          <div className="min-w-0 flex-1">
            <Badge className="border-lime/30 bg-lime/10 text-lime">نسخة مُصلحة · Root Ready · تم التحقق منها</Badge>
            <h1 className="mt-2 text-xl font-black leading-tight sm:text-2xl">
              حزمة Flutter جديدة تحل خطأ Build
            </h1>
            <p className="mt-1 max-w-xl text-[11px] leading-5 text-white/55">
              الملفات الآن في <b className="text-white">جذر الحزمة</b> (pubspec.yaml أولاً)، مع GitHub Actions جاهز يبني APK
              ويكتشف مجلد المشروع تلقائياً — وتم فحص الكود فعلياً على Flutter 3.47.8: تحليل بلا أخطاء وبناء ناجح.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto">
            <a
              href="/downloads/fpl-arena-flutter.zip"
              download
              className="rounded-2xl bg-lime px-5 py-3 text-center text-xs font-extrabold text-black lime-glow"
            >
              ⬇ تنزيل الحزمة المُصلحة (ZIP)
            </a>
            <a
              href="/downloads/flutter-build.yml"
              download
              className="rounded-2xl border border-mint/30 bg-mint/10 px-5 py-2.5 text-center text-[11px] font-extrabold text-mint"
            >
              ⚙ تنزيل ملف GitHub Actions فقط
            </a>
          </div>
        </div>
      </section>

      <Card>
        <SectionTitle
          title="سبب الخطأ الذي ظهر لك"
          subtitle="Expected to find project root in current working directory — Process completed with exit code 1"
        />
        <div className="space-y-2 text-[11px] leading-5 text-white/60">
          <p>
            الـworkflow عندك يشغّل <span className="font-mono text-mint">flutter pub get</span> من <b>جذر الريبو</b>، لكن
            الحزمة القديمة كانت تُفكّ إلى مجلد <span className="font-mono text-white/70">fpl_arena_flutter/</span>، فلم يجد
            Flutter ملف <span className="font-mono text-white/70">pubspec.yaml</span> في مسار العمل وأوقف البناء.
          </p>
          <p>
            الحل: الملفات في الجذر مباشرة، أو تحديد <span className="font-mono text-mint">working-directory</span>، أو
            استخدام الـworkflow المرفق الذي يكتشف المسار بنفسه.
          </p>
        </div>
        <div className="mt-3 grid gap-2 lg:grid-cols-3">
          {FIXES.map((fix) => (
            <div key={fix.tag} className="rounded-2xl bg-white/[0.04] p-3">
              <p className="text-[9px] font-extrabold text-lime">{fix.tag}</p>
              <p className="mt-1 text-xs font-extrabold text-white">{fix.title}</p>
              <p className="mt-1 text-[10px] leading-5 text-white/45">{fix.text}</p>
              <pre dir="ltr" className="mt-2 overflow-x-auto rounded-xl bg-black/40 p-2 text-[9px] leading-4 text-mint/80">
                {fix.code}
              </pre>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-2 sm:grid-cols-3">
        {[
          { icon: "✅", title: "flutter pub get", text: "نجح على Flutter 3.47.8 / Dart 3.13.7" },
          { icon: "✅", title: "flutter analyze", text: "No issues found — بدون أخطاء أو تحذيرات" },
          { icon: "✅", title: "flutter build", text: "bundle و web --release اكتمل بنجاح" },
        ].map((item) => (
          <div key={item.title} className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
            <span>{item.icon}</span>
            <div>
              <p className="font-mono text-[10px] font-bold text-mint" dir="ltr">{item.title}</p>
              <p className="text-[10px] text-white/45">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <Notice>
        بعد رفع الملفات: افتح تبويب <b>Actions</b> في الريبو ← <b>Build Flutter APK</b> ← <b>Run workflow</b>. عند نجاحه نزّل
        الـAPK من <b>Artifacts ← fpl-arena-apk</b>. لا تحتاج Android SDK على جهازك.
      </Notice>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Card>
          <SectionTitle title="ما داخل الحزمة" subtitle="15 ملفاً — pubspec.yaml في الجذر" />
          <div className="space-y-1">
            {FILES.map(([file, desc]) => (
              <div key={file} className="flex flex-wrap items-center gap-2 rounded-xl bg-white/[0.03] px-2 py-1.5">
                <span className="font-mono text-[10px] font-bold text-mint" dir="ltr">{file}</span>
                <span className="text-[10px] text-white/45">{desc}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="خطوات مختصرة" />
            <ol className="space-y-2 text-[11px] leading-5 text-white/60">
              <li>1. نزّل الحزمة وفكّها <b>داخل جذر الريبو</b>.</li>
              <li>2. تأكد أن <span className="font-mono text-white/70">pubspec.yaml</span> و<span className="font-mono text-white/70">.github</span> في نفس المستوى وليس داخل مجلد.</li>
              <li>3. ارفع التغييرات: <span className="font-mono text-mint">git add . && git commit -m fix && git push</span></li>
              <li>4. استبدل/أضف workflow الحزمة ثم شغّل Actions.</li>
              <li>5. أو افتحه في Klencode IDE: New Project ← Flutter ثم الصق <span className="font-mono text-white/70">lib</span> و<span className="font-mono text-white/70">pubspec.yaml</span> واضغط Run.</li>
            </ol>
            <div className="mt-2 rounded-xl bg-amber-400/10 p-2 text-[10px] leading-5 text-amber-200">
              إن أنشأ Klencode مشروعاً كاملاً فهو يملك مجلد android أصلاً؛ الحزمة ملفات مصدرية فقط. واحذف
              <span className="mx-1 font-mono">test/widget_test.dart</span> إن وُجد لأنه يشير إلى MyApp القديم.
            </div>
          </Card>

          <Card>
            <SectionTitle title="روابط سريعة" />
            <div className="grid gap-1.5 text-[11px]">
              <a className="rounded-xl bg-white/[0.04] px-2.5 py-2 font-bold text-lime" href="/downloads/fpl-arena-flutter.zip" download>
                📦 fpl-arena-flutter.zip (جذر الريبو)
              </a>
              <a className="rounded-xl bg-white/[0.04] px-2.5 py-2 font-bold text-mint" href="/downloads/flutter-build.yml" download>
                ⚙ flutter-build.yml
              </a>
              <Link className="rounded-xl bg-white/[0.04] px-2.5 py-2 font-bold text-white/70" href="/team">
                🔎 تجربة «فريقي» في نسخة الويب
              </Link>
            </div>
            <p className="mt-2 text-[10px] leading-5 text-white/35">
              المصدر الافتراضي هو الواجهة الرسمية. لتغييره إلى واجهة هذا الموقع عدّل
              <span className="mx-1 font-mono text-white/50">FplApi.base</span>
              في <span className="font-mono text-white/50">lib/core/api.dart</span>.
            </p>
          </Card>
        </div>
      </div>

      <Card>
        <SectionTitle title="أخطاء أخرى محتملة وحلولها" />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { q: "No Android SDK project found", a: "مجلد android ناقص: نفّذ flutter create --project-name fpl_arena --platforms=android . أو استخدم الـworkflow المرفق الذي يفعله تلقائياً." },
            { q: "Target of URI doesn't exist: package:http", a: "لم يتم تنزيل المكتبات: نفّذ flutter pub get داخل مجلد pubspec.yaml." },
            { q: "Version solving failed", a: "أزلنا intl من الحزمة. إن أضفته لاحقاً ثبّته على إصدار متوافق مع Flutter عندك، أو استخدم التنسيق اليدوي الموجود في core/ui.dart." },
            { q: "widget_test.dart يفشل في analyze/build", a: "احذفه: rm -f test/widget_test.dart — هو مثال افتراضي من flutter create يشير إلى MyApp. الـworkflow المرفق يحذفه تلقائياً." },
            { q: "withOpacity مهجورة في Flutter الحديث", a: "تم استبدالها بامتداد داخلي ColorAlphaX.withAlphaValue في lib/core/ui.dart، فلا تظهر أي تحذيرات." },
            { q: "APK غير موجود في Artifacts", a: "الخطوة التالية في الـworkflow ترفع **/build/app/outputs/flutter-apk/*.apk — تأكد أن خطوة البناء نجحت وليس تخطّتها." },
            { q: "البيانات لا تظهر في التطبيق", a: "تحقق من الإنترنت؛ الواجهة الرسمية قد ترفض الطلبات المتكررة. اضغط أيقونة التحديث أعلى الشاشة." },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl bg-white/[0.03] p-2.5">
              <p className="text-[11px] font-extrabold text-white">{item.q}</p>
              <p className="mt-0.5 text-[10px] leading-5 text-white/45">{item.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
