'use strict';
class Aktivnost {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(t, e, i, n) {
    (this.coords = t),
      (this.distance = e),
      (this.duration = i),
      (this.note = n);
  }
  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} ${this.date.getDate()}. ${
      [
        'siječnja',
        'veljače',
        'ožujka',
        'travnja',
        'svibnja',
        'lipnja',
        'srpnja',
        'kolovoza',
        'rujna',
        'listopada',
        'studenog',
        'prosinca',
      ][this.date.getMonth()]
    }`;
  }
}
class Setnja extends Aktivnost {
  type = 'setnja';
  constructor(t, e, i, n) {
    super(t, e, i, n), this._setDescription();
  }
}
class Bicikliranje extends Aktivnost {
  type = 'bicikliranje';
  constructor(t, e, i, n) {
    super(t, e, i, n), this._setDescription();
  }
}
class Rolanje extends Aktivnost {
  type = 'romobil';
  constructor(t, e, i, n) {
    super(t, e, i, n), this._setDescription();
  }
}
class Izlet extends Aktivnost {
  type = 'izlet';
  constructor(t, e, i, n) {
    super(t, e, i, n), this._setDescription();
  }
}
class Sanjkanje extends Aktivnost {
  type = 'sanjkanje';
  constructor(t, e, i, n) {
    super(t, e, i, n), this._setDescription();
  }
}
const karta = document.getElementById('map'),
  form = document.querySelector('.form'),
  loader = document.querySelector('.loader'),
  containerAktivnosti = document.querySelector('.containerAktivnosti'),
  inputType = document.querySelector('.form__input--type'),
  inputDistance = document.querySelector('.form__input--distance'),
  inputDuration = document.querySelector('.form__input--duration'),
  inputDescription = document.querySelector('.form__input--description'),
  holder = document.querySelectorAll('.image-holder'),
  godisnjaDoba = document.querySelectorAll('.godisnje-doba'),
  proljeceLista = document.querySelector('.proljece--lista'),
  ljetoLista = document.querySelector('.ljeto--lista'),
  jesenLista = document.querySelector('.jesen--lista'),
  medjusloj = document.querySelector('.medjusloj'),
  medjusloj2 = document.querySelector('.medjusloj2'),
  medjusloj3 = document.querySelector('.medjusloj3'),
  medjusloj4 = document.querySelector('.medjusloj4'),
  zimaLista = document.querySelector('.zima--lista'),
  spring = document.querySelector('.spring'),
  summer = document.querySelector('.summer'),
  summerImg = document.querySelector('.summer-img'),
  autumn = document.querySelector('.autumn'),
  winter = document.querySelector('.winter'),
  cancel = document.querySelector('.cancel'),
  btnProljece = document.querySelector('.btn-proljece'),
  btnLjeto = document.querySelector('.btn-ljeto'),
  btnJesen = document.querySelector('.btn-jesen'),
  btnZima = document.querySelector('.btn-zima');
class App {
  #t;
  #e;
  #i = [
    {
      date: '2021-04-10T15:00:00.000Z',
      id: '7368972114',
      coords: [45.807423037271946, 15.893096923828127],
      distance: 5,
      duration: 2,
      note: 'Plavi parkić',
      type: 'setnja',
      description: 'Setnja 10. travnja',
    },
    {
      date: '2021-04-10T15:00:00.000Z',
      id: '7369002618',
      coords: [45.80432374729885, 15.895972251892092],
      distance: 5,
      duration: 2,
      note: 'Kukuljac',
      type: 'romobil',
      description: 'Romobil 10. travnja',
    },
    {
      date: '2021-04-10T15:00:00.000Z',
      id: '7369034826',
      coords: [45.802268427987, 15.895916462468453],
      distance: 7,
      duration: 1.5,
      note: 'Krug oko Kukuljca',
      type: 'bicikliranje',
      description: 'Bicikliranje 10. travnja',
    },
    {
      date: '2021-04-10T15:00:00.000Z',
      id: '7369078057',
      coords: [45.781888393881964, 15.919871807163874],
      distance: 8,
      duration: 3,
      note: 'Đir oko Jaruna',
      type: 'setnja',
      description: 'Setnja 10. travnja',
    },
    {
      date: '2021-04-10T15:00:00.000Z',
      id: '7369207716',
      coords: [45.80071866151842, 15.871010541522995],
      distance: 10,
      duration: 3,
      note: 'Do patkica',
      type: 'izlet',
      description: 'Izlet 10. travnja',
    },
    {
      date: '2020-08-23T15:00:00.000Z',
      id: '7369278868',
      coords: [45.80059599438224, 15.870924711489355],
      distance: 10,
      duration: 2,
      note: 'Išli hraniti patkice',
      type: 'izlet',
      description: 'Izlet 23. kolovoza',
    },
    {
      date: '2020-08-23T15:00:00.000Z',
      id: '7369458011',
      coords: [45.836818822828874, 15.6048721075058],
      distance: 8,
      duration: 2,
      note: 'Divlje vode',
      type: 'izlet',
      description: 'Izlet 23. kolovoza',
    },
    {
      date: '2020-08-23T15:00:00.000Z',
      id: '7369490299',
      coords: [45.71081835554325, 16.09618949471042],
      distance: 10,
      duration: 2,
      note: 'Novo Čiče',
      type: 'bicikliranje',
      description: 'Bicikliranje 23. kolovoza',
    },
    {
      date: '2020-08-23T15:00:00.000Z',
      id: '7369555298',
      coords: [45.88034264907679, 15.797160743422866],
      distance: 9,
      duration: 4,
      note: 'Kod Trajbara ',
      type: 'izlet',
      description: 'Izlet 23. kolovoza',
    },
    {
      date: '2021-10-10T15:00:00.000Z',
      id: '7369793178',
      coords: [45.873783006242355, 15.803413510257089],
      distance: 11,
      duration: 5,
      note: 'Novi dvori Golf',
      type: 'izlet',
      description: 'Izlet 10. listopada',
    },
    {
      date: '2021-10-10T15:00:00.000Z',
      id: '7369849314',
      coords: [45.80288398468955, 15.896927118301393],
      distance: 8,
      duration: 2,
      note: 'Kukuljac',
      type: 'romobil',
      description: 'Romobil 10. listopada',
    },
    {
      date: '2021-10-10T15:00:00.000Z',
      id: '7369872266',
      coords: [45.80008138941919, 15.871727228295644],
      distance: 10,
      duration: 3,
      note: 'Patkice',
      type: 'bicikliranje',
      description: 'Bicikliranje 10. listopada',
    },
    {
      date: '2021-10-10T15:00:00.000Z',
      id: '7369910290',
      coords: [45.80728692340022, 15.893315792181967],
      distance: 5,
      duration: 2,
      note: 'Plavi parkić',
      type: 'setnja',
      description: 'Setnja 10. listopada',
    },
    {
      date: '2020-12-30T16:00:00.000Z',
      id: '7370193186',
      coords: [45.856333665351556, 15.894487382029187],
      distance: 8,
      duration: 3,
      note: 'Sljeme',
      type: 'sanjkanje',
      description: 'Sanjkanje 30. prosinca',
    },
    {
      date: '2020-12-30T16:00:00.000Z',
      id: '7370268931',
      coords: [45.77465937117427, 15.688055991340663],
      distance: 8,
      duration: 4,
      note: 'Rude',
      type: 'izlet',
      description: 'Izlet 30. prosinca',
    },
    {
      date: '2020-12-30T16:00:00.000Z',
      id: '7370399931',
      coords: [45.79734372704254, 15.837684625585101],
      distance: 12,
      duration: 3,
      note: 'Rakitje',
      type: 'setnja',
      description: 'Setnja 30. prosinca',
    },
    {
      date: '2020-12-30T16:00:00.000Z',
      id: '7370491709',
      coords: [45.79663760196601, 15.780761704081673],
      distance: 8,
      duration: 3,
      note: 'Kava u Samoboru',
      type: 'izlet',
      description: 'Izlet 30. prosinca',
    },
    {
      date: '2021-11-20T01:10:27.627Z',
      id: '7370627627',
      coords: [45.804204080079074, 15.89598834530989],
      distance: 3,
      duration: 2,
      note: 'Kukuljac',
      type: 'setnja',
      description: 'Setnja 20. studenog',
    },
  ];
  coords = [];
  constructor() {
    this._getPosition(),
      this._getLocalStorage(),
      this.#i.forEach(t => {
        this._renderAktivnost(t);
      }),
      form.addEventListener('submit', this._novaAktivnost.bind(this)),
      inputType.addEventListener('change', this._toggleElevationField),
      Array.from(godisnjaDoba).forEach(t =>
        t.addEventListener('click', this._prikazAktivKarta.bind(this))
      ),
      Array.from(holder).forEach(t =>
        t.addEventListener('click', this._prikazLista.bind(this))
      ),
      cancel.addEventListener('click', this._hideForm.bind(this)),
      setTimeout(this._slideOut, 3e3);
  }
  _slideOut() {
    loader.classList.remove('loader-in'),
      loader.classList.add('loader-out'),
      setTimeout(() => loader.classList.add('hidden'), 3e3);
  }
  _getPosition() {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }
  _loadMap(t) {
    const { latitude: e } = t.coords,
      { longitude: i } = t.coords;
    this.coords.push(e, i);
    const n = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {}
      ),
      o = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
      a = { Satelit: n, Ulice: o };
    (this.#t = L.map('map', { enableHighAccuracy: !0, layers: [o] }).setView(
      this.coords,
      15
    )),
      L.control.layers(a).addTo(this.#t),
      this.#t.on('click', this._showForm.bind(this)),
      this.#i.forEach(t => {
        this._renderAktivnostMarker(t);
      }),
      L.marker([e, i]).addTo(this.#t);
  }
  _showForm(t) {
    (this.#e = t), form.classList.remove('hidden'), inputDistance.focus();
  }
  _novaAktivnost(t) {
    const e = (...t) => t.every(t => Number.isFinite(t) && t > 0);
    if ((t.preventDefault(), t.target.closest('.cancel'))) return;
    const i = inputType.value,
      n = +inputDistance.value,
      o = +inputDuration.value,
      a = inputDescription.value,
      { lat: s, lng: r } = this.#e.latlng;
    let d;
    if ('setnja' === i) {
      if (!e(n, o)) return alert('Unos mora biti pozitivan broj!');
      d = new Setnja([s, r], n, o, a);
    }
    if ('bicikliranje' === i) {
      if (!e(n, o)) return alert('Unos mora biti pozitivan broj!');
      d = new Bicikliranje([s, r], n, o, a);
    }
    if ('romobil' === i) {
      if (!e(n, o)) return alert('Unos mora biti pozitivan broj!');
      d = new Rolanje([s, r], n, o, a);
    }
    if ('izlet' === i) {
      if (!e(n, o)) return alert('Unos mora biti pozitivan broj!');
      d = new Izlet([s, r], n, o, a);
    }
    if ('sanjkanje' === i) {
      if (!e(n, o)) return alert('Unos mora biti pozitivan broj!');
      d = new Sanjkanje([s, r], n, o, a);
    }
    this.#i.push(d),
      this._renderAktivnostMarker(d),
      this._renderAktivnost(d),
      this._hideForm(),
      this._setLocalStorage();
  }
  _renderAktivnostMarker(t) {
    let e,
      i = this._getGodDoba(t);
    'setnja' === t.type ? (e = '🚶‍♀️🚶‍♂️🚶‍♀️') : t.type,
      'bicikliranje' === t.type ? (e = '🚲🚲🚲') : t.type,
      'romobil' === t.type ? (e = '🛴') : t.type,
      'izlet' === t.type ? (e = '🗻') : t.type,
      'sanjkanje' === t.type ? (e = '❄❄❄ ') : t.type,
      L.marker(t.coords)
        .addTo(this.#t)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: !1,
            closeOnClick: !1,
            className: `${i}-popup`,
          })
        )
        .setPopupContent(`${e} ${t.description}`)
        .openPopup();
  }
  _getGodDoba(t) {
    if (!t) return;
    const e = new Date(t.date),
      [i, n] = [e.getDate(), e.getMonth()];
    let o;
    const a = 100 * (n + 1) + i;
    return (
      (o =
        a <= 320
          ? 'zima'
          : a <= 620
          ? 'proljece'
          : a <= 922
          ? 'ljeto'
          : a <= 1220
          ? 'jesen'
          : 'zima'),
      o
    );
  }
  _renderAktivnost(t) {
    let e;
    'setnja' === t.type ? (e = '🚶‍♀️🚶‍♂️🚶‍♀️') : t.type,
      'bicikliranje' === t.type ? (e = '🚲🚲🚲') : t.type,
      'romobil' === t.type ? (e = '🛴') : t.type,
      'izlet' === t.type ? (e = '🗻') : t.type,
      'sanjkanje' === t.type ? (e = '❄❄❄ ') : t.type;
    let i = 'sati';
    1 === t.duration || 21 === t.duration || 31 === t.duration
      ? (i = 'sat')
      : t.duration,
      2 === t.duration || 22 === t.duration || 32 === t.duration
        ? (i = 'sata')
        : t.duration,
      3 === t.duration || 23 === t.duration || 33 === t.duration
        ? (i = 'sata')
        : t.duration,
      4 === t.duration || 24 === t.duration || 34 === t.duration
        ? (i = 'sata')
        : t.duration;
    const n = this._getGodDoba(t);
    let o = `\n    <li class="aktivnost aktivnost--${t.type} aktivnost--${n}" data-id="${t.id}">\n      <h2 class="aktivnost__title">${t.description}</h2>\n        <div class="aktivnost__details ikone" style="grid-column: 2">\n          <span class="aktivnost__icon"> ${e} </span>\n          <span class="aktivnost__value">${t.distance}</span>\n          <span class="aktivnost__unit">km</span>\n        </div>\n        <div class="aktivnost__details" style="grid-column: 3">\n          <span class="aktivnost__icon">⏱</span>\n          <span class="aktivnost__value">${t.duration}</span>\n          <span class="aktivnost__unit">${i}</span>\n        </div>\n        <div class="aktivnost__details aktivnost__details-note">\n          <span class="aktivnost__icon">📝</span>\n          <span class="aktivnost__value biljeska">${t.note}</span>\n        </div>\n    </li>\n            `;
    [...godisnjaDoba].forEach(t => {
      t.classList.contains(n) &&
        'proljece' === n &&
        proljeceLista.insertAdjacentHTML('afterbegin', o),
        t.classList.contains(n) &&
          'ljeto' === n &&
          ljetoLista.insertAdjacentHTML('afterbegin', o),
        t.classList.contains(n) &&
          'jesen' === n &&
          jesenLista.insertAdjacentHTML('afterbegin', o),
        t.classList.contains(n) &&
          'zima' === n &&
          zimaLista.insertAdjacentHTML('afterbegin', o);
    });
  }
  _hideForm() {
    (inputType.value =
      inputDistance.value =
      inputDuration.value =
      inputDescription.value =
        ''),
      (form.style.display = 'none'),
      form.classList.add('hidden'),
      setTimeout(() => (form.style.display = 'grid'), 1e3);
  }
  _prikazAktivKarta(t) {
    if (!this.#t) return;
    const e = t.target.closest('.aktivnost');
    if (!e) return;
    const i = this.#i.find(t => t.id === e.dataset.id),
      n = document.querySelectorAll('.aktivnost');
    Array.from(n).forEach(t => t.classList.remove('aktivnost--aktivna')),
      i.id === e.dataset.id && e.classList.add('aktivnost--aktivna'),
      this.#t.flyTo(i.coords, 16, { animate: !0, duration: 1 }),
      setTimeout(
        () => this.#t.flyTo(i.coords, 15, { animate: !0, duration: 1 }),
        2e3
      );
  }
  _prikazLista(t) {
    0 !== t.target.parentElement.nextElementSibling.children.length &&
      (t.target === spring &&
        (proljeceLista.classList.remove('hidden'),
        btnProljece.classList.remove('hidden'),
        (medjusloj.style = 'background: url(latice.ce6edc8c.gif);'),
        btnProljece.addEventListener('click', () => {
          proljeceLista.classList.add('hidden'),
            btnProljece.classList.add('hidden'),
            (medjusloj.style = '');
        })),
      (t.target !== summer && t.target !== summerImg) ||
        (ljetoLista.classList.remove('hidden'),
        btnLjeto.classList.remove('hidden'),
        (medjusloj2.style = '\n        z-index: 0;\n      '),
        btnLjeto.addEventListener('click', () => {
          ljetoLista.classList.add('hidden'),
            btnLjeto.classList.add('hidden'),
            (medjusloj2.style = '');
        })),
      t.target === autumn &&
        (jesenLista.classList.remove('hidden'),
        btnJesen.classList.remove('hidden'),
        (medjusloj4.style =
          'background: url(lisce.8bfa1f28.gif) no-repeat;\n      background-size: cover;'),
        btnJesen.addEventListener('click', () => {
          jesenLista.classList.add('hidden'),
            btnJesen.classList.add('hidden'),
            (medjusloj4.style = '');
        })),
      t.target === winter &&
        (zimaLista.classList.remove('hidden'),
        btnZima.classList.remove('hidden'),
        (medjusloj3.style = 'background: url(snijeg.259ed2ff.gif);'),
        btnZima.addEventListener('click', () => {
          btnZima.classList.add('hidden'),
            zimaLista.classList.add('hidden'),
            (medjusloj3.style = '');
        })));
  }
  _setLocalStorage() {
    localStorage.setItem('aktivnosti', JSON.stringify(this.#i));
  }
  _getLocalStorage() {
    const t = JSON.parse(localStorage.getItem('aktivnosti'));
    t &&
      ((this.#i = t),
      this.#i.forEach(t => {
        this._renderAktivnost(t);
      }));
  }
}
const app = new App();
//# sourceMappingURL=index.9f9b4bca.js.map
