'use strict';

// window.addEventListener('load', () => loader.classList.add('hidden'));

class Aktivnost {
  // date = new Date(1618066800000); // proljeće 10.04.2020
  // date = new Date(1598194800000); // ljeto 23.08.2020
  // date = new Date(1633878000000); // jesen
  // date = new Date(1609344000000); // zima 30.12.2020
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration, note) {
    // this.date = ...; ovoga se još uvijek treba držati jer deklariranje javnih ili zaštitećenih varijabli još nije postalo standard
    // this.id = ...;
    this.coords = coords; //[lat, lng]
    this.distance = distance; // u km
    this.duration = duration; // u min.
    this.note = note;
  }
  _setDescription() {
    // prettier-ignore
    const months = ['siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenog', 'prosinca'];
    // prettier-ignore
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} ${this.date.getDate()}. ${months[this.date.getMonth()]}`;
  }
}

class Setnja extends Aktivnost {
  type = 'setnja';
  constructor(coords, distance, duration, note) {
    super(coords, distance, duration, note);
    this._setDescription();
  }
}
class Bicikliranje extends Aktivnost {
  type = 'bicikliranje';
  constructor(coords, distance, duration, note) {
    super(coords, distance, duration, note);
    this._setDescription();
  }
}
class Rolanje extends Aktivnost {
  type = 'romobil';
  constructor(coords, distance, duration, note) {
    super(coords, distance, duration, note);
    this._setDescription();
  }
}
class Izlet extends Aktivnost {
  type = 'izlet';
  constructor(coords, distance, duration, note) {
    super(coords, distance, duration, note);
    this._setDescription();
  }
}
class Sanjkanje extends Aktivnost {
  type = 'sanjkanje';
  constructor(coords, distance, duration, note) {
    super(coords, distance, duration, note);
    this._setDescription();
  }
}
///////////////////////////////////////////////////////////// APP ARCHITECTURE  ///////////////////////////////////////////////////////////
const karta = document.getElementById('map');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const containerAktivnosti = document.querySelector('.containerAktivnosti');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputDescription = document.querySelector('.form__input--description');
const holder = document.querySelectorAll('.image-holder');
const godisnjaDoba = document.querySelectorAll('.godisnje-doba');
const proljeceLista = document.querySelector('.proljece--lista');
const ljetoLista = document.querySelector('.ljeto--lista');
const jesenLista = document.querySelector('.jesen--lista');
const medjusloj = document.querySelector('.medjusloj');
const medjusloj2 = document.querySelector('.medjusloj2');
const medjusloj3 = document.querySelector('.medjusloj3');
const medjusloj4 = document.querySelector('.medjusloj4');
const zimaLista = document.querySelector('.zima--lista');
const spring = document.querySelector('.spring');
const summer = document.querySelector('.summer');
const summerImg = document.querySelector('.summer-img');
const autumn = document.querySelector('.autumn');
const winter = document.querySelector('.winter');
const cancel = document.querySelector('.cancel');
const btnProljece = document.querySelector('.btn-proljece');
const btnLjeto = document.querySelector('.btn-ljeto');
const btnJesen = document.querySelector('.btn-jesen');
const btnZima = document.querySelector('.btn-zima');
const prsten = document.querySelector('.prsten');
const mapa = document.getElementById('map');
const btnMap = document.querySelector('.btn-map');

///////////////////////////////////////////////////// *** ///////////////////////////////////////////////////
///////////////////////////////////////////////////// APP ///////////////////////////////////////////////////
///////////////////////////////////////////////////// *** ///////////////////////////////////////////////////

class App {
  #map;
  #mapEvent;
  #aktivnosti = [
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
      description: 'Bicikl 10. travnja',
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
      description: 'Bicikl 23. kolovoza',
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
      description: 'Bicikl 10. listopada',
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
    this._getPosition();
    this._getLocalStorage();
    this._prikazListeLjeto();
    this._mapaOnOff();
    /////////////////////////////////////SAMO ZA TESTIRANJE /////////////////////
    this.#aktivnosti.forEach(aktiv => {
      this._renderAktivnost(aktiv);
    });
    /////////////////////////////////////////////////////////////////////////////
    form.addEventListener('submit', this._novaAktivnost.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    Array.from(godisnjaDoba).forEach(el =>
      el.addEventListener('click', this._prikazAktivKarta.bind(this))
    );
    Array.from(holder).forEach(el =>
      el.addEventListener('click', this._prikazLista.bind(this))
    );
    cancel.addEventListener('click', this._hideForm.bind(this));

    setTimeout(this._slideOut, 3000);
  }

  _slideOut() {
    loader.classList.remove('loader-in');
    loader.classList.add('loader-out');
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    this.coords.push(latitude, longitude);

    ////////////////////// TILES //////////////////////
    // 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6d0637f16cf045c08a26f98b9813eb24',
    const satelit = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          // attribution:
          //   'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      ),
      ulice = L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          attribution:
            'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

    const baseMaps = {
      Satelit: satelit,
      Ulice: ulice,
    };
    this.#map = L.map('map', {
      enableHighAccuracy: true,
      layers: [ulice],
    }).setView(this.coords, 15);

    L.control.layers(baseMaps).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));

    this.#aktivnosti.forEach(aktiv => {
      this._renderAktivnostMarker(aktiv);
    });

    L.marker([latitude, longitude]).addTo(this.#map);
  }

  _showForm(mapE) {
    //Handlanje klikovima na mapi
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  /* _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  } */

  _novaAktivnost(e) {
    const isValid = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp) && inp > 0);
    e.preventDefault();
    if (e.target.closest('.cancel')) return;

    // Get data from a form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const note = inputDescription.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let aktivnost;

    // If aktivnost setnja, create setnja object itd
    if (type === 'setnja') {
      // Check if data is valid
      if (!isValid(distance, duration))
        return alert('Unos mora biti pozitivan broj!');
      aktivnost = new Setnja([lat, lng], distance, duration, note);
    }
    if (type === 'bicikliranje') {
      if (!isValid(distance, duration))
        return alert('Unos mora biti pozitivan broj!');
      aktivnost = new Bicikliranje([lat, lng], distance, duration, note);
    }
    if (type === 'romobil') {
      if (!isValid(distance, duration))
        return alert('Unos mora biti pozitivan broj!');
      aktivnost = new Rolanje([lat, lng], distance, duration, note);
    }
    if (type === 'izlet') {
      if (!isValid(distance, duration))
        return alert('Unos mora biti pozitivan broj!');
      aktivnost = new Izlet([lat, lng], distance, duration, note);
    }
    if (type === 'sanjkanje') {
      if (!isValid(distance, duration))
        return alert('Unos mora biti pozitivan broj!');
      aktivnost = new Sanjkanje([lat, lng], distance, duration, note);
    }

    // Add new object to aktivnost array
    this.#aktivnosti.push(aktivnost);

    // Render aktivnost as a marker on the map
    this._renderAktivnostMarker(aktivnost);

    // Render aktivnost on list
    this._renderAktivnost(aktivnost);

    // Hide form + clear input fields
    this._hideForm();

    //Set local storage
    this._setLocalStorage();
  }

  _renderAktivnostMarker(aktiv) {
    let godDoba = this._getGodDoba(aktiv);
    let aktivnost;
    aktiv.type === 'setnja' ? (aktivnost = '🚶‍♀️🚶‍♂️🚶‍♀️') : aktiv.type;
    aktiv.type === 'bicikliranje' ? (aktivnost = '🚲🚲🚲') : aktiv.type;
    aktiv.type === 'romobil' ? (aktivnost = '🛴') : aktiv.type;
    aktiv.type === 'izlet' ? (aktivnost = '🗻') : aktiv.type;
    aktiv.type === 'sanjkanje' ? (aktivnost = '❄❄❄ ') : aktiv.type;

    L.marker(aktiv.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${godDoba}-popup`,
        })
      )

      .setPopupContent(`${aktivnost} ${aktiv.description}`)
      .openPopup();
  }

  _getGodDoba(aktivnost) {
    if (!aktivnost) return;
    const date = new Date(aktivnost.date);
    const [day, month] = [date.getDate(), date.getMonth()];

    let godDoba;
    //prettier-ignore
    const monthDay = ((month + 1) * 100) + day;
    if (monthDay <= 320) godDoba = 'zima';
    else if (monthDay <= 620) godDoba = 'proljece';
    else if (monthDay <= 922) godDoba = 'ljeto';
    else if (monthDay <= 1220) godDoba = 'jesen';
    else godDoba = 'zima';
    return godDoba;
  }

  _renderAktivnost(aktivnost) {
    let aktiv;
    aktivnost.type === 'setnja' ? (aktiv = '🚶‍♀️🚶‍♂️🚶‍♀️') : aktivnost.type;
    aktivnost.type === 'bicikliranje' ? (aktiv = '🚲🚲🚲') : aktivnost.type;
    aktivnost.type === 'romobil' ? (aktiv = '🛴') : aktivnost.type;
    aktivnost.type === 'izlet' ? (aktiv = '🗻') : aktivnost.type;
    aktivnost.type === 'sanjkanje' ? (aktiv = '❄❄❄ ') : aktivnost.type;

    let sat = 'sati';
    aktivnost.duration === 1 ||
    aktivnost.duration === 21 ||
    aktivnost.duration === 31
      ? (sat = 'sat')
      : aktivnost.duration;
    aktivnost.duration === 2 ||
    aktivnost.duration === 22 ||
    aktivnost.duration === 32
      ? (sat = 'sata')
      : aktivnost.duration;
    aktivnost.duration === 3 ||
    aktivnost.duration === 23 ||
    aktivnost.duration === 33
      ? (sat = 'sata')
      : aktivnost.duration;
    aktivnost.duration === 4 ||
    aktivnost.duration === 24 ||
    aktivnost.duration === 34
      ? (sat = 'sata')
      : aktivnost.duration;

    const doba = this._getGodDoba(aktivnost);
    //prettier-ignore
    let html = `
    <li class="aktivnost aktivnost--${aktivnost.type} aktivnost--${doba}" data-id="${aktivnost.id}">
      <h2 class="aktivnost__title">${aktivnost.description}</h2>
        <div class="aktivnost__details ikone" style="grid-column: 2">
          <span class="aktivnost__icon"> ${aktiv} </span>
          <span class="aktivnost__value">${aktivnost.distance}</span>
          <span class="aktivnost__unit">km</span>
        </div>
        <div class="aktivnost__details" style="grid-column: 3">
          <span class="aktivnost__icon">⏱</span>
          <span class="aktivnost__value">${aktivnost.duration}</span>
          <span class="aktivnost__unit">${sat}</span>
        </div>
        <div class="aktivnost__details aktivnost__details-note">
          <span class="aktivnost__icon">📝</span>
          <span class="aktivnost__value biljeska">${aktivnost.note}</span>
        </div>
    </li>
            `;

    const pljjz = [...godisnjaDoba];
    pljjz.forEach(dob => {
      if (dob.classList.contains(doba) && doba === 'proljece')
        proljeceLista.insertAdjacentHTML('afterbegin', html);
      if (dob.classList.contains(doba) && doba === 'ljeto')
        ljetoLista.insertAdjacentHTML('afterbegin', html);
      if (dob.classList.contains(doba) && doba === 'jesen')
        jesenLista.insertAdjacentHTML('afterbegin', html);
      if (dob.classList.contains(doba) && doba === 'zima')
        zimaLista.insertAdjacentHTML('afterbegin', html);
    });
    // containerAktivnosti.insertAdjacentHTML('afterend', html);
  }

  _hideForm() {
    // prettier-ignore
    inputType.value = inputDistance.value = inputDuration.value = inputDescription.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _prikazAktivKarta(e) {
    if (!this.#map) return;
    //const [lat, lng] = this.coords;
    const aktivnostEl = e.target.closest('.aktivnost');
    //guard clause -> stražar
    if (!aktivnostEl) return;

    // prettier-ignore
    const aktivnost = this.#aktivnosti.find(akt => akt.id === aktivnostEl.dataset.id);

    const aktivnostiSve = document.querySelectorAll('.aktivnost');
    Array.from(aktivnostiSve).forEach(a =>
      a.classList.remove('aktivnost--aktivna')
    );

    aktivnost.id === aktivnostEl.dataset.id
      ? aktivnostEl.classList.add('aktivnost--aktivna')
      : '';

    /////////////////////animirani prijelazi ////////////
    // prettier-ignore
    this.#map.flyTo(aktivnost.coords, 16, { animate: true, duration: 1 });
    setTimeout(
      () =>
        this.#map.flyTo(aktivnost.coords, 15, {
          animate: true,
          duration: 1,
        }),
      2000
    );

    // this.#map.setView(aktivnost.coords, 15, {
    //   animate: true,
    //   pan: {
    //     duration: 1,
    //   },
    // });
    // aktiv.click();
    
    if (window.matchMedia("(max-width: 48em").matches) {
      prsten.classList.toggle('map-prsten');
      mapa.classList.toggle('map-prsten');
    }
  }

  _prikazLista(e) {
    if (e.target.parentElement.nextElementSibling.children.length === 0) return;
    if (e.target === spring) {
      proljeceLista.classList.remove('hidden');
      btnProljece.classList.remove('hidden');
      medjusloj.style = `background: url(../img/latice.gif);`;
      btnProljece.addEventListener('click', () => {
        proljeceLista.classList.add('hidden');
        btnProljece.classList.add('hidden');
        medjusloj.style = ``;
      });
    }
    
    if (e.target === summer) {
      ljetoLista.classList.remove('hidden');
      btnLjeto.classList.remove('hidden');
      medjusloj2.style = `
        z-index: 0;
      `;
      btnLjeto.addEventListener('click', () => {
        ljetoLista.classList.add('hidden');
        btnLjeto.classList.add('hidden');
        medjusloj2.style = ``;
      });
    }
    if (e.target === autumn) {
      jesenLista.classList.remove('hidden');
      btnJesen.classList.remove('hidden');
      medjusloj4.style = `background: url(../img/lisce.gif) no-repeat;
      background-size: cover;`;
      btnJesen.addEventListener('click', () => {
        jesenLista.classList.add('hidden');
        btnJesen.classList.add('hidden');
        medjusloj4.style = ``;
      });
    }
    if (e.target === winter) {
      zimaLista.classList.remove('hidden');
      btnZima.classList.remove('hidden');
      medjusloj3.style = `background: url(../img/snijeg.gif);`;
      btnZima.addEventListener('click', () => {
        btnZima.classList.add('hidden');
        zimaLista.classList.add('hidden');
        medjusloj3.style = ``;
      });
    }
  }
  
  _prikazListeLjeto () {
    summerImg.addEventListener('click', function(){
      ljetoLista.classList.remove('hidden');
          btnLjeto.classList.remove('hidden');
          medjusloj2.style = `
            z-index: 0;
          `;
          btnLjeto.addEventListener('click', () => {
            ljetoLista.classList.add('hidden');
            btnLjeto.classList.add('hidden');
            medjusloj2.style = ``;
          });
    })
  }
  
  _mapaOnOff () {
    if (window.matchMedia("(max-width: 48em").matches) {
        prsten.classList.add('map-prsten');
        mapa.classList.add('map-prsten');
        btnMap.addEventListener('click', function(){
          prsten.classList.toggle('map-prsten');
          mapa.classList.toggle('map-prsten');  
        })
      }
  }

  _setLocalStorage() {
    localStorage.setItem('aktivnosti', JSON.stringify(this.#aktivnosti));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('aktivnosti'));
    if (!data) return;

    this.#aktivnosti = data;
    // console.log(JSON.stringify(data));

    this.#aktivnosti.forEach(aktiv => {
      this._renderAktivnost(aktiv);
    });
  }

  // reset() {
  //   localStorage.removeItem('aktivnosti');
  //   location.reload();
  // }
}

const app = new App();
