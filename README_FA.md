# بسته ارزیابی UI/UX + Frontend همراه Mock API

این بسته برای ارسال **یکسان** به داوطلبان طراحی شده است. با اجرای Mock API، تمام عملیات خواندن و ذخیره‌سازی واقعاً از طریق HTTP انجام می‌شوند و داده‌ها در یک فایل SQLite محلی باقی می‌مانند.

**زمان ارسال تسک:** دوشنبه  
**آخرین مهلت تحویل:** چهارشنبه همان هفته، ساعت ۱۷:۰۰ به وقت تهران.  
تاریخ دقیق دوشنبه و چهارشنبه در پیام ارسال تسک اعلام می‌شود.

## محتویات بسته

- `docs/CANDIDATE_TASK_FA.md` — صورت‌مسئله و معیارهای ارزیابی
- `docs/API_CONTRACT_FA.md` — مستندات API و چالش پیشرفته
- `mock-api/app.py` — سرور FastAPI
- `mock-api/seed_requests.json` — ۱۶ درخواست نمونه فارسی
- `mock-api/reset_data.py` — بازگردانی داده‌های اولیه
- `mock-api/requirements.txt` — وابستگی‌های Python

## راه‌اندازی آسان با Docker (بدون نصب Python)

از پوشه اصلی بسته (کنار فایل `docker-compose.yml`) اجرا کنید:

```bash
docker compose up --build
```

API از طریق `http://127.0.0.1:8000` در دسترس خواهد بود و داده‌ها داخل Docker Volume حفظ می‌شوند. برای توقف `Ctrl+C` را بزنید. برای پاک‌کردن **همه داده‌های آزمایشی Docker** و شروع دوباره:

```bash
docker compose down -v
docker compose up --build
```

## راه‌اندازی در Windows (PowerShell)

پیش‌نیاز: Python 3.10 یا بالاتر.

```powershell
cd mock-api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

اگر PowerShell اجازه اجرای Activate.ps1 نداد، بدون فعال‌سازی محیط این دو دستور را اجرا کنید:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

## راه‌اندازی در Linux یا macOS

```bash
cd mock-api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

## تست اولیه

- API Docs: http://127.0.0.1:8000/docs
- Health: http://127.0.0.1:8000/api/health
- List: http://127.0.0.1:8000/api/requests
- Stats: http://127.0.0.1:8000/api/stats

## بازگردانی داده‌ها

سرور را متوقف کنید و از پوشه `mock-api` اجرا کنید:

```bash
python reset_data.py
```

سپس سرور را مجدداً روشن کنید. فایل دیتابیس محلی و تغییرات قبلی حذف می‌شوند و ۱۶ درخواست اولیه بازمی‌گردند.

## نکات مهم برای مسئول استخدام

1. برای مقایسه منصفانه، همین فایل‌ها و صورت‌مسئله را برای همه داوطلبان ارسال کنید.
2. هر داوطلب **نمونه محلی مستقل** خودش را اجرا کند. یک دیتابیس مشترک برای همه داوطلبان استفاده نکنید، زیرا تغییرات آن‌ها با هم تداخل خواهد داشت.
3. الزام اصلی «اتصال واقعی Frontend به API» است؛ تأمین Backend یا تغییر سورس Mock API از داوطلب انتظار نمی‌رود.
4. چالش 409 Conflict و Optimistic UI اختیاری و دارای امتیاز اضافه است؛ کاندیدایی که این بخش را پیاده نمی‌کند نباید از امتیاز پایه محروم شود.
5. این API عمداً ساده و **بدون احراز هویت** است. به طور پیش‌فرض فقط روی `127.0.0.1` راه‌اندازی کنید. اگر نیاز به دسترسی از اینترنت دارید، باید برای هر داوطلب دسترسی مجزا و کنترل‌های امنیتی مناسب فراهم شود.
6. در صورت نیاز به کنترل میزان استفاده از ابزارهای هوش مصنوعی، از همه داوطلبان یک توضیح کوتاه درباره سهم کار و تصمیم‌های فنی‌شان بخواهید؛ تمرکز بر توانایی توضیح و تغییر کد باشد.
