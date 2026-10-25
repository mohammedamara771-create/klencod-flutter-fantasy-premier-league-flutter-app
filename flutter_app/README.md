# فانتازي أرينا — مشروع Flutter (Root Ready)

> **مهم:** ملفات هذا المجلد مصمّمة لتوضع **في جذر المستودع** (بحيث يكون `pubspec.yaml` بجانب `.github/` و`lib/`).
> إذا وضعتها داخل مجلد فرعي مثل `fpl_arena_flutter/` فسيفشل `flutter pub get` بالخطأ:
> `Expected to find project root in current working directory`.

## إصلاح الخطأ الذي ظهر لك

```
Run flutter pub get
Expected to find project root in current working directory.
##[error]Process completed with exit code 1.
```

**السبب:** الـworkflow يشغّل `flutter pub get` من جذر المستودع، لكن `pubspec.yaml` كان داخل مجلد فرعي (الحزمة القديمة كانت داخل `fpl_arena_flutter/`)، أو أن الملفات لم تُرفع أصلاً.

**ثلاثة حلول (اختر واحداً):**

1. **الأفضل:** انقل محتويات المجلد الفرعي إلى الجذر بحيث يصبح المسار:
   ```
   /pubspec.yaml
   /lib/main.dart
   /.github/workflows/flutter-build.yml
   ```
   ثم `git add . && git commit -m "move flutter project to root" && git push`.

2. أو عدّل الـworkflow الموجود عندك وأضف سطر `working-directory` لكل خطوة:
   ```yaml
   - name: Flutter pub get
     working-directory: fpl_arena_flutter   # اسم مجلد المشروع عندك
     run: flutter pub get
   ```

3. أو استبدل ملف الـworkflow بالملف المرفق `.github/workflows/flutter-build.yml` — فهو يكتشف مكان `pubspec.yaml` تلقائياً، ويولّد `android/` إذا كانت ناقصة، ويرفع لك APK في Artifacts.

بعد نجاحه: صفحة **Actions ← Build Flutter APK ← Artifacts ← fpl-arena-apk** تحتوي ملف APK جاهزاً للتثبيت.

## الطريقة الأسهل داخل Klencode IDE

1. من Klencode: **New Project ← Flutter** باسم `fpl_arena` (هذه الخطوة تولّد `android/` و`ios/` و`pubspec.yaml` تلقائياً).
2. استبدل مجلد `lib` بمجلد `lib` من هذه الحزمة، وانسخ `pubspec.yaml` و`analysis_options.yaml`.
3. اضغط **Get Packages / Pub Get** ثم **Run ▶**.
4. احذف `test/widget_test.dart` إن وُجد (يشير إلى `MyApp` القديم فيفشل التحليل).

## بناء APK من الطرفية

```bash
flutter create --project-name fpl_arena --org com.fplarena --platforms=android .
rm -f test/widget_test.dart
flutter pub get
flutter build apk --release
# الملف: build/app/outputs/flutter-apk/app-release.apk
```

## مصدر البيانات

```
https://fantasy.premierleague.com/api/bootstrap-static/
https://fantasy.premierleague.com/api/fixtures/
https://fantasy.premierleague.com/api/element-summary/{playerId}/
https://fantasy.premierleague.com/api/entry/{entryId}/
https://fantasy.premierleague.com/api/entry/{entryId}/event/{gw}/picks/
```

بدون أي مفتاح API. التطبيق يخزّن `bootstrap` في الذاكرة 5 دقائق لتقليل الطلبات.
يمكنك تبديل المصدر إلى واجهة نسخة الويب بتعديل سطر واحد في `lib/core/api.dart`:

```dart
static const String base = 'https://YOUR-APP-DOMAIN/api/fpl';
```

## الشاشات

| الشاشة | المحتوى |
| --- | --- |
| الرئيسية | الجولة الحالية، متوسط النقاط، أفضل اللاعبين، الفورمة، صعود/هبوط الأسعار، الامتلاك |
| اللاعبون | بحث + فلترة بالمركز/السعر/التوفر + 9 مؤشرات فرز |
| تفاصيل اللاعب | نقاط، xG/xA/xGI، ICT، بونص، BPS، تصديات، دفاعي، مباريات الخصوم بـ FDR، سجل الجولات، المواسم السابقة |
| فريقي | رقم المدير ← الترتيب العام، القيمة، البنك، التشكيلة، الكابتن، الدكة |
| المباريات | كل الجولات + صعوبة المباراة FDR |
| الإحصاءات | 15 تصنيفاً إحصائياً |

## المكتبات

- `http: ^1.2.0` فقط (بدون `intl` لتجنّب تعارض الإصدارات في Flutter الحديث).

## التحقق الفعلي

تم فحص المشروع فعلياً على **Flutter 3.47.8 (Dart 3.13.7)**:

```bash
flutter pub get                     # ✅ نجح
flutter analyze                     # ✅ No issues found!
flutter build bundle                # ✅ نجح
flutter build web --release         # ✅ نجح
```

## ملاحظات

- التطبيق عربي RTL بثيم داكن، ملفات المصدر فقط (13 ملف Dart).
- تطبيق غير تابع رسمياً لـ Fantasy Premier League.
