/* ============================================================
   かざあな隊｜大手飲食チェーン開拓 LP
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     ▼ 設定：フォームの送信先
     Googleフォーム / Formspree / 自社CRM などのURLを入れてください。
     空のままだと、送信時に「送信先が未設定です」と表示されます。
     -------------------------------------------------------- */
  var FORM_ENDPOINT = '';

  /* ---------- ヘッダー：スクロールで境界線を出す ---------- */
  var header = document.getElementById('header');
  var fixedCta = document.getElementById('fixedCta');
  var hero = document.querySelector('.hero');

  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 10);
    // ヒーローを抜けたらスマホ用の追従CTAを出す
    if (fixedCta && hero) {
      fixedCta.classList.toggle('is-visible', y > hero.offsetHeight * 0.7);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- スクロールで要素をふわっと表示 ---------- */
  var targets = document.querySelectorAll(
    '.card, .insight, .step, .result-box, .strength, .case__item, .case-points, .stat, .quote, .fit__col, .price-box, .flow__item, .faq__item, .form'
  );

  if ('IntersectionObserver' in window) {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

    // 保険：何らかの理由で監視が発火しない場合も、必ず表示状態にする
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        Array.prototype.forEach.call(
          document.querySelectorAll('.reveal:not(.is-in)'),
          function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < window.innerHeight) el.classList.add('is-in');
          }
        );
      }, 1200);
    });
  }

  /* ---------- FAQ：ひとつ開いたら他を閉じる ---------- */
  var faqItems = document.querySelectorAll('.faq__item');
  Array.prototype.forEach.call(faqItems, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqItems, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- お問い合わせフォーム ---------- */
  var form = document.getElementById('contactForm');
  if (!form) return;

  var errorBox = document.getElementById('formError');
  var doneBox = document.getElementById('formDone');

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.hidden = false;
  }
  function clearError() {
    if (!errorBox) return;
    errorBox.hidden = true;
    errorBox.textContent = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();
    if (doneBox) doneBox.hidden = true;

    // --- バリデーション ---
    var required = form.querySelectorAll('[required]');
    var firstInvalid = null;

    Array.prototype.forEach.call(required, function (field) {
      var value = field.value.trim();
      var invalid = value === '';

      if (!invalid && field.type === 'email') {
        invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      field.classList.toggle('is-error', invalid);
      if (invalid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      showError('未入力または形式に誤りのある項目があります。ご確認ください。');
      firstInvalid.focus();
      return;
    }

    // --- 送信 ---
    if (!FORM_ENDPOINT) {
      showError(
        '送信先が未設定です。assets/js/main.js の FORM_ENDPOINT に送信先URLを設定してください。'
      );
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = '送信中…';
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('status ' + res.status);
        form.reset();
        if (doneBox) {
          doneBox.textContent =
            'お問い合わせありがとうございます。担当より2営業日以内にご連絡いたします。';
          doneBox.hidden = false;
        }
      })
      .catch(function () {
        showError('送信に失敗しました。時間をおいて再度お試しください。');
      })
      .finally(function () {
        if (button) {
          button.disabled = false;
          button.textContent = '無料相談を申し込む';
        }
      });
  });
})();
