const STORAGE_KEY = 'socialMallStaticState:v1';

const seedState = {
  me: {
    id: 1,
    username: 'techhunter',
    name: 'TechHunter',
    avatar: 'TH',
    coins: 12450,
    streak: 7
  },
  stores: [
    {
      id: 1,
      slug: 'techhunter',
      ownerId: 1,
      owner: 'TechHunter',
      avatar: 'TH',
      name: 'TechHunter',
      category: 'Техника',
      description: 'Гаджеты, аксессуары и компактные вещи для продуктивного рабочего места.',
      rating: 4.8,
      visitors: 3812,
      followers: 128,
      neon: '#a855f7',
      background: 'atrium',
      sign: 'neon-box',
      decor: ['plants', 'neon', 'posters', 'shelves']
    },
    {
      id: 2,
      slug: 'homevibes',
      ownerId: 2,
      owner: 'Мария',
      avatar: 'HV',
      name: 'HomeVibes',
      category: 'Дом и уют',
      description: 'Свет, текстиль, хранение и маленькие решения, которые делают квартиру уютнее.',
      rating: 4.9,
      visitors: 2604,
      followers: 243,
      neon: '#22d3ee',
      background: 'loft',
      sign: 'soft-sign',
      decor: ['plants', 'shelves', 'posters']
    },
    {
      id: 3,
      slug: 'sportpower',
      ownerId: 3,
      owner: 'Алексей',
      avatar: 'SP',
      name: 'SportPower',
      category: 'Спорт',
      description: 'Товары для тренировок, восстановления и активных выходных.',
      rating: 4.7,
      visitors: 1940,
      followers: 182,
      neon: '#f59e0b',
      background: 'garage',
      sign: 'sport-led',
      decor: ['neon', 'posters']
    },
    {
      id: 4,
      slug: 'glowlab',
      ownerId: 4,
      owner: 'GlowLab',
      avatar: 'GL',
      name: 'GlowLab',
      category: 'Красота',
      description: 'Уход, косметика, ароматы и красивые полки без лишней суеты.',
      rating: 4.6,
      visitors: 1510,
      followers: 96,
      neon: '#fb7185',
      background: 'boutique',
      sign: 'script',
      decor: ['plants', 'neon', 'shelves']
    },
    {
      id: 5,
      slug: 'gamefloor',
      ownerId: 5,
      owner: 'GameFloor',
      avatar: 'GF',
      name: 'GameFloor',
      category: 'Игры',
      description: 'Игры, настолки, ретро-девайсы и домашний досуг.',
      rating: 4.5,
      visitors: 1288,
      followers: 74,
      neon: '#34d399',
      background: 'arcade',
      sign: 'pixel',
      decor: ['neon', 'posters', 'shelves']
    }
  ],
  products: [
    product(1, 1, 'AirPods Pro 2', '$249', 'Аудио', 'Шумодав, компактный кейс и понятный выбор для ежедневных созвонов.', 243, 421, 1),
    product(2, 1, 'Keychron K2', '$79', 'Клавиатуры', 'Механика без огромного корпуса, удобная и для ноутбука, и для стола.', 188, 306, 2),
    product(3, 1, 'Logitech MX Master 3S', '$99', 'Периферия', 'Тихая мышь для длинной работы и быстрого переключения между устройствами.', 211, 344, 3),
    product(4, 1, 'Xiaomi Desk Lamp', '$45', 'Свет', 'Ровный свет, минимум места и быстрые сценарии для вечерней работы.', 97, 188, 4),
    product(5, 1, 'Bellroy Classic Backpack', '$129', 'Сумки', 'Чистый рюкзак для ноутбука, зарядок и маленького набора на день.', 152, 255, 5),
    product(6, 1, 'DJI Mini Drone', '$399', 'Камеры', 'Легкий дрон для путешествий и быстрых кадров витринных роликов.', 86, 93, null),
    product(7, 1, 'Fujifilm X100V', '$1399', 'Камеры', 'Камера мечты для прогулок по городу и съемки красивых подборок.', 130, 121, null),
    product(8, 1, 'Standing Desk Mat', '$39', 'Офис', 'Мягкий коврик для тех, кто часть дня работает стоя.', 42, 77, null),
    product(9, 2, 'Linen Throw Blanket', '$64', 'Текстиль', 'Плед, который добавляет комнате спокойный слой цвета и фактуры.', 167, 222, 1),
    product(10, 2, 'Ceramic Table Lamp', '$88', 'Свет', 'Теплый настольный свет для спальни, полки или гостиной.', 241, 318, 2),
    product(11, 2, 'Modular Shelf', '$119', 'Хранение', 'Полка, которую можно собрать под книги, декор и технику.', 131, 176, 3),
    product(12, 2, 'Aroma Diffuser', '$35', 'Ароматы', 'Небольшой диффузор для спокойного вечернего ритуала.', 118, 141, 4),
    product(13, 2, 'Woven Basket', '$42', 'Хранение', 'Корзина для пледов, кабелей или детских вещей.', 96, 102, 5),
    product(14, 3, 'Recovery Roller', '$27', 'Восстановление', 'Ролл для ног и спины после тренировок или долгой прогулки.', 84, 133, 1),
    product(15, 3, 'Hydration Pack', '$74', 'Бег', 'Легкий беговой жилет для воды, ключей и телефона.', 71, 90, 2),
    product(16, 3, 'Yoga Block Set', '$22', 'Йога', 'Два блока и ремень для растяжки дома.', 93, 110, 3),
    product(17, 3, 'Smart Jump Rope', '$49', 'Фитнес', 'Скакалка со счетчиком для коротких домашних тренировок.', 66, 75, 4),
    product(18, 3, 'Trail Bottle', '$31', 'Аксессуары', 'Металлическая бутылка для зала, дороги и рабочих дней.', 58, 62, 5),
    product(19, 4, 'Vitamin C Serum', '$29', 'Уход', 'Легкая сыворотка для утреннего ухода и ровного тона.', 122, 167, 1),
    product(20, 4, 'Satin Sleep Mask', '$18', 'Сон', 'Мягкая маска для сна и путешествий.', 76, 80, 2),
    product(21, 4, 'Travel Brush Kit', '$36', 'Косметика', 'Набор кистей, который не занимает половину сумки.', 95, 91, 3),
    product(22, 4, 'Minimal Fragrance', '$58', 'Ароматы', 'Чистый аромат без громкого шлейфа для офиса и встреч.', 104, 113, 4),
    product(23, 4, 'Stone Gua Sha', '$16', 'Уход', 'Холодный камень для вечернего ухода и расслабления лица.', 69, 71, 5),
    product(24, 5, 'Retro Handheld', '$89', 'Игры', 'Карманная консоль для коротких ретро-сессий.', 156, 201, 1),
    product(25, 5, 'Co-op Board Game', '$44', 'Настолки', 'Кооперативная настолка для вечера на 3-5 игроков.', 82, 88, 2),
    product(26, 5, 'RGB Desk Strip', '$24', 'Свет', 'Подсветка для полки, монитора или игрового уголка.', 111, 119, 3),
    product(27, 5, 'Controller Stand', '$21', 'Аксессуары', 'Стойка, чтобы геймпады не жили на краю стола.', 73, 70, 4),
    product(28, 5, 'Pixel Poster Pack', '$19', 'Декор', 'Постеры для игровой стены без визуальной перегрузки.', 61, 64, 5)
  ],
  comments: [
    comment('store', 1, 'Мария', 'Отличная подборка! Клавиатуру тоже рекомендую.', 7),
    comment('store', 1, 'Алексей', 'Лампа спасает глаза вечером, взял себе такую же.', 4),
    comment('store', 2, 'TechHunter', 'Корзины выглядят спокойно, надо добавить в рабочую зону.', 3),
    comment('product', 1, 'Мария', 'Шумодав очень выручает в дороге и на созвонах.', 8),
    comment('product', 2, 'GameFloor', 'Хорошая база, если хочется механики без огромной клавиатуры.', 5),
    comment('product', 3, 'Алексей', 'После обычной мыши разница ощущается сразу.', 6)
  ],
  follows: [2, 3],
  activity: [
    activity('daily', 'Ежедневный вход в Social Mall', 25),
    activity('visit', 'Новые посетители заглянули в TechHunter', 40),
    activity('like', 'Товар AirPods Pro 2 получил лайки', 18),
    activity('comment', 'Мария оставила комментарий к витрине', 12),
    activity('product', 'Добавлен товар Standing Desk Mat в коллекцию', 8)
  ]
};

let state = loadState();
applyOwnerConfig();

function product(id, storeId, name, price, category, description, likes, clicks, slot) {
  return {
    id,
    storeId,
    name,
    price,
    category,
    description,
    likes,
    clicks,
    activeSlot: slot,
    commentsCount: Math.max(2, Math.floor(likes / 18)),
    referralUrl: `https://example.com/ref/${slugify(name)}`
  };
}

function comment(type, targetId, author, body, likes) {
  return {
    id: Math.random().toString(36).slice(2),
    type,
    targetId,
    author,
    avatar: author
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    body,
    likes,
    date: new Date().toISOString()
  };
}

function activity(type, text, coins) {
  return { id: Math.random().toString(36).slice(2), type, text, coins, date: new Date().toISOString() };
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(seedState);
  } catch {
    return structuredClone(seedState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateChrome();
}

function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(seedState);
  render();
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/(^-|-$)/g, '');
}

function money(value) {
  return new Intl.NumberFormat('ru-RU').format(Number(value || 0));
}

function route() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const parts = raw.split('/').filter(Boolean);
  return { raw, parts, name: parts[0] || '', id: parts[1] || '' };
}

function navigate(path) {
  location.hash = path;
}

function updateChrome() {
  document.getElementById('coinBalance').textContent = money(state.me.coins);
  const current = route().raw;
  document.querySelectorAll('[data-nav]').forEach((item) => {
    const nav = item.getAttribute('data-nav');
    item.classList.toggle('active', nav === current || (nav !== '/' && current.startsWith(nav)));
  });
}

function render() {
  updateChrome();
  const app = document.getElementById('app');
  const current = route();
  const view = {
    '': homePage,
    mall: mallPage,
    store: storePage,
    dashboard: dashboardPage,
    editor: editorPage,
    setup: setupPage,
    collection: collectionPage,
    earnings: earningsPage,
    product: productPage
  }[current.name];

  app.innerHTML = view ? view(current.id) : notFoundPage();
  bindPageEvents();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function homePage() {
  const stores = getFilteredStores();
  const featured = stores[0] || state.stores[0];
  const trending = [...state.products].sort((a, b) => b.likes + b.clicks - (a.likes + a.clicks)).slice(0, 6);

  return `
    <div class="stack">
      <section class="grid-2">
        <div class="panel pad hero">
          <span class="eyebrow">социальная сеть витрин</span>
          <h1>Прогулка по торговому центру, где каждый рекомендует свое</h1>
          <p>Открывайте витрины людей, смотрите 5 активных находок, обсуждайте товары и переходите по внешним реферальным ссылкам. Social Mall ничего не продает напрямую.</p>
          <div class="actions">
            <a class="btn primary" href="#/dashboard">Открыть витрину</a>
            <a class="btn" href="#/mall">Зайти в ТЦ</a>
            <button class="btn" data-action="reset">Сбросить demo</button>
          </div>
          <div class="stats-row" style="margin-top:24px">
            ${stat('5', 'активных товаров')}
            ${stat('100', 'товаров в коллекции')}
            ${stat('0₽', 'продаж внутри MVP')}
            ${stat(money(state.stores.length), 'витрин в ТЦ')}
          </div>
        </div>
        <div class="panel pad">
          <h2>Витрина дня</h2>
          ${storeCard(featured)}
        </div>
      </section>

      <section class="grid-2">
        <div class="panel pad">
          <h2>Что происходит в ТЦ</h2>
          <div class="comments">
            ${state.activity
              .slice(0, 6)
              .map(
                (item) => `
                  <article class="comment">
                    <div class="avatar">${state.me.avatar}</div>
                    <div>
                      <strong>${state.me.name}</strong>
                      <p style="margin-bottom:0">${escapeHtml(item.text)} <b style="color:${item.coins >= 0 ? 'var(--amber)' : 'var(--rose)'}">${item.coins > 0 ? '+' : ''}${item.coins}</b></p>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
        <div class="panel pad">
          <div class="toolbar">
            <h2>Товары, которые обсуждают</h2>
            <a class="btn" href="#/mall">Все витрины</a>
          </div>
          <div class="grid-3">
            ${trending.map((item) => productCard(item, true)).join('')}
          </div>
        </div>
      </section>

      <section class="panel pad">
        <div class="toolbar">
          <div>
            <h2>Лента витрин</h2>
            <p class="muted">Ищите людей, подборки, категории и новые маленькие магазины.</p>
          </div>
          ${categoryFilters()}
        </div>
        <div class="grid-3" style="margin-top:18px">
          ${stores.map(storeCard).join('')}
        </div>
      </section>
    </div>
  `;
}

function mallPage() {
  const stores = getFilteredStores();
  return `
    <div class="stack">
      <section class="panel pad hero">
        <span class="eyebrow">виртуальный торговый центр</span>
        <h1>Лента как прогулка по этажам</h1>
        <p>Переключайте категории, включайте случайные витрины и заходите в магазины так, будто идете вдоль неоновых фасадов.</p>
        <div class="actions">
          <button class="btn amber" data-action="random-store">Случайная витрина</button>
          <a class="btn" href="#/">На главную</a>
        </div>
      </section>
      <section class="panel pad">
        <div class="toolbar">
          <h2>Этажи ТЦ</h2>
          ${categoryFilters()}
        </div>
      </section>
      <section class="grid-3">
        ${stores.map(storeCard).join('')}
      </section>
    </div>
  `;
}

function storePage(slugOrId) {
  const store = findStore(slugOrId) || state.stores[0];
  store.visitors += 1;
  saveState();
  const products = activeProducts(store.id);
  const isOwn = store.ownerId === state.me.id;
  return `
    <div class="stack">
      ${storefront(store, products, isOwn)}
      <section class="grid-2">
        <div class="stack">
          <div class="panel pad">
            <h2>О витрине</h2>
            <p>${escapeHtml(store.description)}</p>
            <div class="notice">Social Mall не продает товары. Кнопки перехода ведут на внешние сайты по реферальным ссылкам авторов.</div>
          </div>
          ${commentsBlock('store', store.id)}
        </div>
        <aside class="stack">
          <button class="btn amber" data-action="random-store">Случайная витрина</button>
          <div class="panel pad">
            <h2>Рядом в ТЦ</h2>
            <div class="stack">
              ${state.stores
                .filter((item) => item.id !== store.id)
                .slice(0, 3)
                .map(storeCard)
                .join('')}
            </div>
          </div>
        </aside>
      </section>
    </div>
  `;
}

function dashboardPage() {
  const store = state.stores.find((item) => item.ownerId === state.me.id);
  const mine = collection();
  const active = activeProducts(store.id);
  const clicks = mine.reduce((sum, item) => sum + item.clicks, 0);
  return `
    <div class="stack">
      <section class="grid-4">
        ${metricCard('Баланс монет', money(state.me.coins), 'var(--amber)')}
        ${metricCard('Переходы по ссылкам', money(clicks), 'var(--cyan)')}
        ${metricCard('Посещения витрины', money(store.visitors), 'var(--violet)')}
        ${metricCard('Подписчики', money(store.followers), 'var(--green)')}
      </section>
      ${storefront(store, active, true)}
      <section class="grid-2">
        <div class="panel pad">
          <div class="toolbar">
            <div>
              <h2>Активные товары</h2>
              <p class="muted">Эти 5 карточек видят посетители публичной витрины.</p>
            </div>
            <a class="btn primary" href="#/collection">Управлять</a>
          </div>
          <div class="grid-5" style="margin-top:16px">${active.map((item) => productCard(item, true)).join('')}</div>
        </div>
        <div class="panel pad">
          <h2>История активности</h2>
          <div class="comments">
            ${state.activity
              .slice(0, 10)
              .map(
                (item) => `
                  <article class="comment">
                    <div class="avatar">${state.me.avatar}</div>
                    <div>
                      <strong>${escapeHtml(item.text)}</strong>
                      <p style="margin-bottom:0;color:${item.coins >= 0 ? 'var(--amber)' : 'var(--rose)'}">${item.coins > 0 ? '+' : ''}${item.coins} монет</p>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function collectionPage() {
  const mine = collection();
  const activeCount = mine.filter((item) => item.activeSlot).length;
  return `
    <div class="stack">
      <section class="panel pad">
        <div class="toolbar">
          <div>
            <span class="eyebrow">коллекция до 100 товаров</span>
            <h1 style="font-size:42px;margin-top:12px">Моя коллекция</h1>
            <p class="muted">Меняйте сезонную пятерку, не удаляя остальные находки.</p>
          </div>
          <div class="stats-row" style="min-width:min(430px,100%)">
            ${stat(`${activeCount}/5`, 'активно')}
            ${stat(`${mine.length}/100`, 'в коллекции')}
          </div>
        </div>
      </section>
      <section class="panel pad">
        <h2>Новая карточка товара</h2>
        <form class="form" data-form="product">
          <div class="form-grid">
            ${field('name', 'Название')}
            ${field('price', 'Цена', '$99')}
            ${field('category', 'Категория', 'Техника')}
            ${field('referralUrl', 'Реферальная ссылка', 'https://example.com/ref/...')}
            <label style="grid-column:1/-1"><span>Описание</span><textarea name="description" placeholder="Почему вы рекомендуете этот товар?"></textarea></label>
          </div>
          <div class="actions"><button class="btn cyan">Добавить в коллекцию</button></div>
        </form>
      </section>
      <section class="grid-4">
        ${mine
          .map(
            (item) => `
              <div class="${item.activeSlot ? 'active-card' : ''}" style="border-radius:22px">
                ${productCard(item)}
                <button class="btn ${item.activeSlot ? 'green' : ''}" style="width:100%;margin-top:8px" data-action="toggle-active" data-id="${item.id}">
                  ${item.activeSlot ? 'Активен на витрине' : 'На витрину'}
                </button>
              </div>
            `
          )
          .join('')}
      </section>
    </div>
  `;
}

function setupPage() {
  const store = state.stores.find((item) => item.ownerId === state.me.id);
  const active = activeProducts(store.id);
  const slots = [0, 1, 2, 3, 4].map(
    (index) => active[index] || product(9000 + index, 1, '', '', '', '', 0, 0, index + 1)
  );

  return `
    <div class="stack">
      <section class="panel pad hero">
        <span class="eyebrow">первая публичная витрина</span>
        <h1>Заполните свою витрину и реферальные ссылки</h1>
        <p>На GitHub Pages форма может сохранить данные в вашем браузере. Чтобы эта витрина стала публичной для всех посетителей, нажмите "Сгенерировать код" и замените файл <b>site-data.js</b> в репозитории.</p>
        <div class="notice">Без backend статический сайт не может сам записывать данные в GitHub. Поэтому для публичной версии используется файл <b>site-data.js</b>.</div>
      </section>

      <section class="grid-2">
        <form class="panel pad form" data-form="owner-store">
          <h2>Описание витрины</h2>
          <div class="form-grid">
            <label><span>Название витрины</span><input name="storeName" value="${escapeAttr(store.name)}" /></label>
            <label><span>Ваше имя</span><input name="ownerName" value="${escapeAttr(store.owner)}" /></label>
            <label><span>Категория</span><input name="category" value="${escapeAttr(store.category)}" /></label>
            <label><span>Цвет неона</span><input name="neon" value="${escapeAttr(store.neon)}" /></label>
            <label style="grid-column:1/-1"><span>Описание</span><textarea name="description">${escapeHtml(store.description)}</textarea></label>
          </div>

          <h2 style="margin-top:24px">5 активных товаров</h2>
          ${slots
            .map(
              (item, index) => `
                <fieldset class="product-fieldset">
                  <legend>Товар ${index + 1}</legend>
                  <div class="form-grid">
                    <label><span>Название</span><input name="p${index}_name" value="${escapeAttr(item.name)}" /></label>
                    <label><span>Цена</span><input name="p${index}_price" value="${escapeAttr(item.price)}" placeholder="$99" /></label>
                    <label><span>Категория</span><input name="p${index}_category" value="${escapeAttr(item.category)}" /></label>
                    <label><span>Реферальная ссылка</span><input name="p${index}_referralUrl" value="${escapeAttr(item.referralUrl || '')}" placeholder="https://..." /></label>
                    <label style="grid-column:1/-1"><span>Описание</span><textarea name="p${index}_description">${escapeHtml(item.description)}</textarea></label>
                  </div>
                </fieldset>
              `
            )
            .join('')}
          <div class="actions">
            <button class="btn cyan">Сохранить в браузере</button>
            <button class="btn primary" type="button" data-action="generate-config">Сгенерировать код</button>
            <a class="btn" href="#/store/techhunter">Открыть витрину</a>
          </div>
        </form>

        <aside class="stack">
          <div class="panel pad">
            <h2>Код для site-data.js</h2>
            <p class="muted">После генерации скопируйте этот код в файл <b>site-data.js</b> в GitHub и сохраните commit.</p>
            <textarea id="configOutput" class="code-output" placeholder="Здесь появится код для публикации"></textarea>
            <div class="actions">
              <button class="btn" data-action="copy-config">Скопировать</button>
            </div>
          </div>
          <div>
            ${storefront(store, active, true)}
          </div>
        </aside>
      </section>
    </div>
  `;
}

function editorPage() {
  const store = state.stores.find((item) => item.ownerId === state.me.id);
  const active = activeProducts(store.id);
  const colors = ['#a855f7', '#22d3ee', '#f59e0b', '#34d399', '#fb7185'];
  const backgrounds = ['atrium', 'loft', 'garage', 'boutique', 'arcade'];
  const decor = ['plants', 'neon', 'posters', 'shelves', 'mirrors', 'arcade'];
  return `
    <div class="grid-2">
      <aside class="panel pad">
        <span class="eyebrow">редактор витрины</span>
        <h1 style="font-size:42px;margin-top:12px">Оформление</h1>
        <p class="muted">Покупка оформления списывает 25 монет. Это внутренняя валюта, не реальные деньги.</p>

        <h3>Фон</h3>
        <div class="filters">${backgrounds.map((item) => `<button class="btn ${store.background === item ? 'cyan' : ''}" data-action="theme" data-key="background" data-value="${item}">${decorLabel(item)}</button>`).join('')}</div>

        <h3 style="margin-top:20px">Цвет подсветки</h3>
        <div class="filters">${colors.map((color) => `<button class="btn" data-action="theme" data-key="neon" data-value="${color}" style="background:${color};color:white;min-width:48px">${store.neon === color ? '✓' : ''}</button>`).join('')}</div>

        <h3 style="margin-top:20px">Декор</h3>
        <div class="filters">${decor.map((item) => `<button class="btn ${store.decor.includes(item) ? 'green' : ''}" data-action="decor" data-value="${item}">${decorLabel(item)}</button>`).join('')}</div>
      </aside>
      <div>${storefront(store, active, true)}</div>
    </div>
  `;
}

function earningsPage() {
  const mine = collection().sort((a, b) => b.clicks - a.clicks);
  const clicks = mine.reduce((sum, item) => sum + item.clicks, 0);
  const income = clicks * 0.18;
  return `
    <div class="stack">
      <section class="grid-3">
        ${metricCard('Клики по реферальным ссылкам', money(clicks), 'var(--cyan)')}
        ${metricCard('Предполагаемый доход', `$${income.toFixed(2)}`, 'var(--green)')}
        ${metricCard('Средняя оценка клика', '$0.18', 'var(--amber)')}
      </section>
      <section class="panel pad">
        <h1 style="font-size:42px">Мой заработок</h1>
        <p class="muted">GitHub Pages demo не выплачивает реальные деньги. Здесь показываются клики и расчетная оценка дохода автора витрины.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Товар</th><th>Категория</th><th>Клики</th><th>Оценка дохода</th><th></th></tr></thead>
            <tbody>
              ${mine
                .map(
                  (item) => `
                    <tr>
                      <td><strong>${escapeHtml(item.name)}</strong><br><span class="muted">${escapeHtml(item.price)}</span></td>
                      <td>${escapeHtml(item.category)}</td>
                      <td><strong>${money(item.clicks)}</strong></td>
                      <td><strong style="color:var(--green)">$${(item.clicks * 0.18).toFixed(2)}</strong></td>
                      <td><a class="btn" href="#/product/${item.id}">Открыть</a></td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function productPage(id) {
  const item = state.products.find((productItem) => productItem.id === Number(id)) || state.products[0];
  const store = state.stores.find((storeItem) => storeItem.id === item.storeId);
  return `
    <div class="stack">
      <a class="btn" href="#/store/${store.slug}">← Назад в витрину ${escapeHtml(store.name)}</a>
      <section class="grid-2 panel" style="overflow:hidden">
        <div class="product-img" style="min-height:420px">${productSvg(item)}</div>
        <div class="pad">
          <div class="owner-line">
            <div class="avatar">${store.avatar}</div>
            <div><span class="small-meta">рекомендует</span><br><strong>${escapeHtml(store.owner)}</strong></div>
          </div>
          <h1 style="font-size:48px;margin-top:18px">${escapeHtml(item.name)}</h1>
          <div class="chips">
            <span class="chip" style="background:var(--cyan);color:#07111f">${escapeHtml(item.price)}</span>
            <span class="chip">${escapeHtml(item.category)}</span>
            <span class="chip">реферальная ссылка</span>
          </div>
          <p style="margin-top:20px">${escapeHtml(item.description)}</p>
          <div class="actions">
            <button class="btn cyan" data-action="ref" data-id="${item.id}">Перейти по ссылке</button>
            <button class="btn" data-action="like" data-id="${item.id}">♡ ${item.likes}</button>
            <span class="btn">${item.commentsCount} комментариев</span>
          </div>
        </div>
      </section>
      ${commentsBlock('product', item.id)}
    </div>
  `;
}

function notFoundPage() {
  return `
    <section class="panel pad" style="text-align:center;min-height:420px;display:grid;place-items:center">
      <div>
        <h1>Этого крыла ТЦ нет на карте</h1>
        <p class="muted">Вернитесь в ленту витрин или откройте торговый центр.</p>
        <div class="actions" style="justify-content:center">
          <a class="btn cyan" href="#/">На главную</a>
          <a class="btn" href="#/mall">В торговый центр</a>
        </div>
      </div>
    </section>
  `;
}

function storefront(store, products, isOwn = false) {
  const following = state.follows.includes(store.id);
  return `
    <section class="storefront" style="--store-neon:${store.neon}">
      <div class="storefront-inner">
        <div class="big-sign">${escapeHtml(store.name)}</div>
        <div class="store-glass">
          <div class="store-head">
            <div class="owner-line">
              <div class="avatar">${store.avatar}</div>
              <div>
                <h2 style="margin-bottom:4px">${escapeHtml(store.owner)}</h2>
                <div class="chips">
                  <span class="chip">${escapeHtml(store.category)}</span>
                  <span class="chip">${money(store.followers)} подписчиков</span>
                  <span class="chip">${money(store.visitors)} посетителей</span>
                  <span class="chip">${store.rating} рейтинг</span>
                </div>
              </div>
            </div>
            <div class="actions" style="margin-top:0">
              ${
                isOwn
                  ? '<a class="btn" href="#/editor">Редактировать</a>'
                  : `<button class="btn primary" data-action="follow" data-id="${store.id}">${following ? 'Вы подписаны' : 'Подписаться'}</button>`
              }
              <button class="btn" data-action="random-store">Случайная витрина</button>
            </div>
          </div>
          <div class="grid-5" style="margin-top:18px">
            ${products.map((item) => productCard(item, true)).join('')}
          </div>
          <div class="notice" style="margin-top:16px">В публичной витрине активно только 5 товаров. Декор: ${store.decor.map(decorLabel).join(' • ')}</div>
        </div>
      </div>
    </section>
  `;
}

function storeCard(store) {
  const active = activeProducts(store.id).length;
  return `
    <a class="store-card" href="#/store/${store.slug}" style="--store-neon:${store.neon}">
      <div class="facade">
        <div class="facade-shop"></div>
        <div class="sign">${escapeHtml(store.name)}</div>
      </div>
      <div class="store-body">
        <div class="owner-line">
          <div class="avatar">${store.avatar}</div>
          <div>
            <strong>${escapeHtml(store.owner)}</strong>
            <div class="small-meta">${escapeHtml(store.category)}</div>
          </div>
        </div>
        <p style="margin-top:14px">${escapeHtml(store.description)}</p>
        <div class="mini-stats">
          <span><b>${store.rating}</b>рейтинг</span>
          <span><b>${active}</b>товаров</span>
          <span><b>${money(store.visitors)}</b>визитов</span>
          <span><b>${money(store.followers)}</b>подписок</span>
        </div>
      </div>
    </a>
  `;
}

function productCard(item, dense = false) {
  return `
    <article class="product-card">
      <a href="#/product/${item.id}" class="product-img" style="min-height:${dense ? '120px' : '160px'}">
        <span class="ref-label">реферальная ссылка</span>
        ${productSvg(item)}
      </a>
      <div class="product-body">
        <div class="product-top">
          <strong>${escapeHtml(item.name)}</strong>
          <span class="price">${escapeHtml(item.price)}</span>
        </div>
        <div class="small-meta" style="margin-top:6px">${escapeHtml(item.category)}</div>
        <p style="margin-top:10px">${escapeHtml(dense ? truncate(item.description, 74) : item.description)}</p>
        <div class="product-actions">
          <button class="btn cyan" data-action="ref" data-id="${item.id}">Перейти</button>
          <button class="icon-btn" data-action="like" data-id="${item.id}">♡ ${item.likes}</button>
          <span class="icon-btn">${item.commentsCount}</span>
        </div>
      </div>
    </article>
  `;
}

function commentsBlock(type, targetId) {
  const rows = state.comments.filter((item) => item.type === type && item.targetId === targetId);
  return `
    <section class="panel pad">
      <div class="toolbar">
        <h2>Комментарии</h2>
        <span class="chip">${rows.length}</span>
      </div>
      <div class="comments">
        ${rows
          .map(
            (item) => `
              <article class="comment">
                <div class="avatar">${item.avatar}</div>
                <div>
                  <strong>${escapeHtml(item.author)}</strong>
                  <p style="margin-bottom:4px">${escapeHtml(item.body)}</p>
                  <span class="small-meta">♡ ${item.likes}</span>
                </div>
              </article>
            `
          )
          .join('')}
      </div>
      <form class="comment-form" data-form="comment" data-type="${type}" data-target="${targetId}">
        <input name="body" placeholder="Написать комментарий..." />
        <button class="btn primary">Отправить</button>
      </form>
    </section>
  `;
}

function bindPageEvents() {
  document.querySelectorAll('[data-action]').forEach((node) => {
    node.addEventListener('click', handleAction);
  });

  document.querySelectorAll('[data-form="comment"]').forEach((form) => {
    form.addEventListener('submit', submitComment);
  });

  const productForm = document.querySelector('[data-form="product"]');
  if (productForm) productForm.addEventListener('submit', submitProduct);

  const ownerForm = document.querySelector('[data-form="owner-store"]');
  if (ownerForm) ownerForm.addEventListener('submit', submitOwnerStore);
}

function handleAction(event) {
  const target = event.currentTarget;
  const action = target.dataset.action;
  const id = Number(target.dataset.id);

  if (action === 'like') {
    const item = state.products.find((productItem) => productItem.id === id);
    item.likes += 1;
    addCoins(2, `Товар ${item.name} получил лайк`);
    saveState();
    render();
  }

  if (action === 'ref') {
    const item = state.products.find((productItem) => productItem.id === id);
    item.clicks += 1;
    addCoins(4, `Переход по реферальной ссылке: ${item.name}`);
    saveState();
    window.open(item.referralUrl, '_blank', 'noopener,noreferrer');
    render();
  }

  if (action === 'follow') {
    const store = state.stores.find((storeItem) => storeItem.id === id);
    if (state.follows.includes(id)) {
      state.follows = state.follows.filter((item) => item !== id);
      store.followers = Math.max(0, store.followers - 1);
    } else {
      state.follows.push(id);
      store.followers += 1;
      addCoins(10, `Новая подписка на витрину ${store.name}`);
    }
    saveState();
    render();
  }

  if (action === 'random-store') {
    const pick = state.stores[Math.floor(Math.random() * state.stores.length)];
    navigate(`/store/${pick.slug}`);
  }

  if (action === 'toggle-active') {
    toggleActive(id);
  }

  if (action === 'theme') {
    const store = state.stores.find((item) => item.ownerId === state.me.id);
    if (!spendDecor()) return;
    store[target.dataset.key] = target.dataset.value;
    saveState();
    render();
  }

  if (action === 'decor') {
    const store = state.stores.find((item) => item.ownerId === state.me.id);
    if (!spendDecor()) return;
    const value = target.dataset.value;
    store.decor = store.decor.includes(value) ? store.decor.filter((item) => item !== value) : [...store.decor, value];
    saveState();
    render();
  }

  if (action === 'filter') {
    sessionStorage.setItem('socialMallCategory', target.dataset.value);
    render();
  }

  if (action === 'reset') {
    resetDemo();
  }

  if (action === 'generate-config') {
    generateOwnerConfig();
  }

  if (action === 'copy-config') {
    const output = document.getElementById('configOutput');
    if (output?.value) navigator.clipboard?.writeText(output.value);
  }
}

function submitOwnerStore(event) {
  event.preventDefault();
  const payload = ownerConfigFromForm(event.currentTarget);
  applyOwnerPayload(payload);
  addCoins(8, 'Обновлена первая витрина');
  saveState();
  render();
}

function generateOwnerConfig() {
  const form = document.querySelector('[data-form="owner-store"]');
  const output = document.getElementById('configOutput');
  if (!form || !output) return;
  const payload = ownerConfigFromForm(form);
  output.value = `window.SOCIAL_MALL_OWNER_CONFIG = ${JSON.stringify(payload, null, 2)};\n`;
}

function ownerConfigFromForm(form) {
  const data = Object.fromEntries(new FormData(form));
  return {
    store: {
      name: data.storeName,
      owner: data.ownerName,
      category: data.category,
      description: data.description,
      neon: data.neon || '#a855f7'
    },
    products: [0, 1, 2, 3, 4].map((index) => ({
      name: data[`p${index}_name`],
      price: data[`p${index}_price`],
      category: data[`p${index}_category`],
      description: data[`p${index}_description`],
      referralUrl: data[`p${index}_referralUrl`]
    }))
  };
}

function applyOwnerConfig() {
  if (localStorage.getItem(STORAGE_KEY)) return;
  if (!window.SOCIAL_MALL_OWNER_CONFIG) return;
  applyOwnerPayload(window.SOCIAL_MALL_OWNER_CONFIG);
}

function applyOwnerPayload(payload) {
  const store = state.stores.find((item) => item.ownerId === state.me.id);
  if (payload.store) {
    store.name = payload.store.name || store.name;
    store.owner = payload.store.owner || store.owner;
    store.category = payload.store.category || store.category;
    store.description = payload.store.description || store.description;
    store.neon = payload.store.neon || store.neon;
  }

  if (Array.isArray(payload.products)) {
    state.products = state.products.filter((item) => item.storeId !== 1 || !item.activeSlot);
    payload.products.slice(0, 5).forEach((item, index) => {
      if (!item.name) return;
      state.products.push({
        id: 1000 + index,
        storeId: 1,
        name: item.name,
        price: item.price || '',
        category: item.category || store.category,
        description: item.description || '',
        referralUrl: item.referralUrl || '#',
        likes: 0,
        clicks: 0,
        commentsCount: 0,
        activeSlot: index + 1
      });
    });
  }
}

function submitComment(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const body = new FormData(form).get('body').trim();
  if (!body) return;
  state.comments.unshift(comment(form.dataset.type, Number(form.dataset.target), state.me.name, body, 0));
  addCoins(5, 'Добавлен комментарий');
  saveState();
  render();
}

function submitProduct(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const mine = collection();
  if (mine.length >= 100) {
    alert('В коллекции уже 100 товаров.');
    return;
  }
  if (!data.name || !data.price || !data.category || !data.description || !data.referralUrl) {
    alert('Заполните название, цену, категорию, описание и реферальную ссылку.');
    return;
  }
  const nextId = Math.max(...state.products.map((item) => item.id)) + 1;
  state.products.unshift({
    id: nextId,
    storeId: 1,
    name: data.name,
    price: data.price,
    category: data.category,
    description: data.description,
    referralUrl: data.referralUrl,
    likes: 0,
    clicks: 0,
    commentsCount: 0,
    activeSlot: null
  });
  addCoins(8, `Добавлен товар ${data.name} в коллекцию`);
  saveState();
  render();
}

function toggleActive(id) {
  const item = state.products.find((productItem) => productItem.id === id);
  if (!item || item.storeId !== 1) return;
  if (item.activeSlot) {
    item.activeSlot = null;
  } else {
    const active = collection().filter((productItem) => productItem.activeSlot).sort((a, b) => a.activeSlot - b.activeSlot);
    if (active.length >= 5) active[0].activeSlot = null;
    const used = new Set(collection().filter((productItem) => productItem.activeSlot).map((productItem) => productItem.activeSlot));
    item.activeSlot = [1, 2, 3, 4, 5].find((slot) => !used.has(slot)) || 5;
  }
  saveState();
  render();
}

function spendDecor() {
  if (state.me.coins < 25) {
    alert('Недостаточно монет для покупки декора.');
    return false;
  }
  addCoins(-25, 'Куплен элемент оформления витрины');
  return true;
}

function addCoins(coins, text) {
  state.me.coins += coins;
  state.activity.unshift(activity(coins >= 0 ? 'earn' : 'spend', text, coins));
}

function getFilteredStores() {
  const category = sessionStorage.getItem('socialMallCategory') || 'Все';
  const search = (document.getElementById('globalSearch')?.value || '').toLowerCase();
  return state.stores.filter((store) => {
    const byCategory = category === 'Все' || store.category === category;
    const bySearch =
      !search ||
      [store.name, store.owner, store.category, store.description].some((value) => value.toLowerCase().includes(search));
    return byCategory && bySearch;
  });
}

function categoryFilters() {
  const current = sessionStorage.getItem('socialMallCategory') || 'Все';
  const cats = ['Все', ...new Set(state.stores.map((item) => item.category))];
  return `<div class="filters">${cats.map((cat) => `<button class="btn ${current === cat ? 'cyan' : ''}" data-action="filter" data-value="${cat}">${cat}</button>`).join('')}</div>`;
}

function activeProducts(storeId) {
  return state.products
    .filter((item) => item.storeId === storeId && item.activeSlot)
    .sort((a, b) => a.activeSlot - b.activeSlot)
    .slice(0, 5);
}

function collection() {
  return state.products.filter((item) => item.storeId === 1);
}

function findStore(slugOrId) {
  return state.stores.find((store) => store.slug === slugOrId || store.id === Number(slugOrId));
}

function stat(value, label) {
  return `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`;
}

function metricCard(label, value, color) {
  return `<div class="panel pad"><div style="color:${color};font-size:28px;font-weight:950">${value}</div><div class="muted">${label}</div></div>`;
}

function field(name, label, placeholder = '') {
  return `<label><span>${label}</span><input name="${name}" placeholder="${placeholder}" /></label>`;
}

function decorLabel(value) {
  return (
    {
      atrium: 'Атриум',
      loft: 'Лофт',
      garage: 'Гараж',
      boutique: 'Бутик',
      arcade: 'Аркада',
      plants: 'Растения',
      neon: 'Неон',
      posters: 'Постеры',
      shelves: 'Полки',
      mirrors: 'Зеркала'
    }[value] || value
  );
}

function productSvg(item) {
  const colors = ['#a855f7', '#22d3ee', '#f59e0b', '#34d399', '#fb7185'];
  const color = colors[item.id % colors.length];
  const dark = item.id % 2 ? '#111827' : '#0f172a';
  return `
    <svg viewBox="0 0 260 190" role="img" aria-label="${escapeHtml(item.name)}">
      <defs>
        <linearGradient id="g${item.id}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".96"/>
          <stop offset="1" stop-color="${color}" stop-opacity=".42"/>
        </linearGradient>
      </defs>
      <rect x="28" y="26" width="204" height="138" rx="28" fill="url(#g${item.id})"/>
      <rect x="65" y="62" width="130" height="74" rx="18" fill="${dark}" opacity=".16"/>
      <path d="M76 118 H184" stroke="${color}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="94" cy="82" r="18" fill="${dark}" opacity=".22"/>
      <circle cx="166" cy="82" r="18" fill="${dark}" opacity=".14"/>
    </svg>
  `;
}

function truncate(value, max) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('\n', ' ');
}

document.getElementById('globalSearch')?.addEventListener('input', () => {
  if (['', 'mall'].includes(route().name)) render();
});

window.addEventListener('hashchange', render);
render();
