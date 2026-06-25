import { useState } from 'react'
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import Input from './components/ui/Input'
import Badge from './components/ui/Badge'
import Alert from './components/ui/Alert'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [inputError, setInputError] = useState('')
  const [alerts, setAlerts] = useState({
    info: true,
    brand: true,
    success: true,
    danger: true,
    warning: true
  })

  const handleInputChange = (e) => {
    const val = e.target.value
    setInputText(val)
    if (val.length < 3) {
      setInputError('يجب أن يكون النص 3 أحرف على الأقل')
    } else {
      setInputError('')
    }
  }

  const dismissAlert = (key) => {
    setAlerts(prev => ({ ...prev, [key]: false }))
  }

  return (
    <main className="page">
      <div className="preview-shell container">
        <header className="section-header">
          <h1>نظام تصميم Aura Spa</h1>
          <p>معاينة المكونات الأساسية بنظام ألوان Riso Print ورسوم الطباعة</p>
        </header>

        <section className="preview-section">
          <h3>الأزرار (Buttons)</h3>
          <div className="preview-row">
            <Button variant="primary">زر رئيسي (Primary)</Button>
            <Button variant="secondary">زر ثانوي (Secondary)</Button>
            <Button variant="ghost">زر شفاف (Ghost)</Button>
            <Button variant="primary" disabled>غير نشط (Disabled)</Button>
          </div>
          <div className="preview-row">
            <Button variant="primary" size="sm">صغير</Button>
            <Button variant="primary" size="base">افتراضي</Button>
            <Button variant="primary" size="lg">كبير</Button>
          </div>
          <div className="preview-row">
            <Button variant="secondary" fullWidth>زر ثانوي بعرض كامل (Full Width)</Button>
          </div>
        </section>

        <section className="preview-section">
          <h3>البطاقات (Cards)</h3>
          <div className="grid grid-3">
            <Card variant="default">
              <h4>بطاقة افتراضية</h4>
              <p className="mt-8">تحتوي على ظل إزاحي صلب بالأزرق الداكن ولا تتفاعل مع الفأرة.</p>
            </Card>
            <Card variant="interactive">
              <h4>بطاقة تفاعلية</h4>
              <p className="mt-8">تحتوي على تأثير حركي عند مرور الفأرة والضغط عليها حيث تقترب من ظلها.</p>
            </Card>
            <Card variant="flat">
              <h4>بطاقة مسطحة</h4>
              <p className="mt-8">بطاقة هادئة بدون أي ظل خارجي، مناسبة للمكونات الداخلية.</p>
            </Card>
          </div>
        </section>

        <section className="preview-section">
          <h3>حقول الإدخال (Inputs)</h3>
          <div className="grid grid-2">
            <Input
              id="name-input"
              label="الاسم الكامل"
              placeholder="أدخل اسمك هنا..."
              value={inputText}
              onChange={handleInputChange}
              hint="ادخل اسمك الثلاثي كما هو مسجل في الهوية"
              required
            />
            <Input
              id="error-input"
              label="حقل يحتوي على خطأ"
              placeholder="اكتب شيئاً..."
              value={inputText}
              onChange={handleInputChange}
              error={inputError || 'هناك خطأ في إدخال البيانات'}
              required
            />
          </div>
          <div className="mt-16">
            <Input
              id="textarea-input"
              label="ملاحظات إضافية"
              placeholder="اكتب ملاحظاتك هنا..."
              textarea
            />
          </div>
        </section>

        <section className="preview-section">
          <h3>الشارات (Badges)</h3>
          <div className="preview-row">
            <Badge variant="brand">شعار (Brand)</Badge>
            <Badge variant="success">مكتمل (Success)</Badge>
            <Badge variant="danger">ملغي (Danger)</Badge>
            <Badge variant="warning">قيد الانتظار (Warning)</Badge>
            <Badge variant="neutral">افتراضي (Neutral)</Badge>
            <Badge variant="dark">داكن (Dark)</Badge>
          </div>
          <div className="preview-row">
            <Badge variant="brand" pill>شارة دائرية (Pill)</Badge>
            <Badge variant="success" pill>حالة متصل</Badge>
            <Badge variant="danger" pill>حالة مشغول</Badge>
          </div>
          <div className="preview-row">
            <Badge variant="brand" size="large">شعار كبير</Badge>
            <Badge variant="success" size="large">نجاح كبير</Badge>
          </div>
        </section>

        <section className="preview-section">
          <h3>التنبيهات (Alerts)</h3>
          <div className="flex flex-col gap-16">
            {alerts.info && (
              <Alert variant="info" title="تنبيه معلوماتي" onDismiss={() => dismissAlert('info')}>
                هذا تنبيه يحتوي على معلومات عامة للمستخدم باستخدام نمط ألوان Riso الهادئ.
              </Alert>
            )}
            {alerts.brand && (
              <Alert variant="brand" title="تنبيه الهوية (Brand)" onDismiss={() => dismissAlert('brand')}>
                هذا تنبيه مخصص باستخدام لون الهوية الوردي الفلوري للإجراءات المهمة جداً.
              </Alert>
            )}
            {alerts.success && (
              <Alert variant="success" title="تمت العملية بنجاح" onDismiss={() => dismissAlert('success')}>
                لقد تم حجز موعدك بنجاح وسنقوم بالتواصل معك لتأكيد الموعد قريباً.
              </Alert>
            )}
            {alerts.danger && (
              <Alert variant="danger" title="حدث خطأ أثناء المعالجة" onDismiss={() => dismissAlert('danger')}>
                يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى. بعض الحقول غير مكتملة.
              </Alert>
            )}
            {alerts.warning && (
              <Alert variant="warning" title="تحذير هام" onDismiss={() => dismissAlert('warning')}>
                يرجى العلم أن إلغاء الموعد قبل أقل من 24 ساعة قد يترتب عليه رسوم إضافية.
              </Alert>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
