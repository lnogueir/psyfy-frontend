/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
class Utils {
  static validateYouTubeUrl(url) {
    if (url && (url !== undefined || url !== '')) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length === 11) {
        return match[2]
      }
    }
    return null
  }

  static isEmptyString(str) {
    return typeof str === 'undefined' || str == null || str.trim() === '' || str === undefined
  }


  static getRandomNumber() { return Math.floor(Math.random() * 10000) }


  static updateStateField(key, value) {
    this.setState({
      [key]: value
    })
  }


  static concatTimes(filteredDaysArray) {
    return filteredDaysArray.reduce((r, n) => {
      const lastSubArray = r[r.length - 1];
      if (!lastSubArray || lastSubArray[lastSubArray.length - 1].block !== n.block - 1) {
        r.push([]);
      }
      r[r.length - 1].push(n);
      return r;
    }, []);
  }

  static scheduleToFreeBlocks(schedule) {
    return Utils.concatTimes(schedule.reduce((filtered, block, i) => {
      if (block.is_available) {
        filtered.push({ block: i })
      }
      return filtered
    }, []))
  }

  static getLoggedUser() {
    const correct_storage = window.localStorage.getItem('loggedUser') || window.sessionStorage.getItem('loggedUser') || null
    return correct_storage != null && JSON.parse(correct_storage)
  }


  static getDivParent(elem) {
    while (elem && elem.tagName !== 'DIV') elem = elem.parentNode;
    return elem
  }

  static getButtonParent(elem) {
    while (elem && elem.tagName !== 'BUTTON') elem = elem.parentNode;
    return elem
  }

  static getTdParent(elem) {
    while (elem && elem.tagName !== 'TD') elem = elem.parentNode;
    return elem
  }


  static get ERROR_MESSAGE() { return "Error processing request. Please contact admin." }

  static get MONTHS() {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }

  static get WEEK() {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }

  static get DEFAULT_SCHEDULE() {
    return [
      { start: '6:00am', end: '6:30am', is_available: false }, { start: '6:30am', end: '7:00am', is_available: false },
      { start: '7:00am', end: '7:30am', is_available: false }, { start: '7:30am', end: '8:00am', is_available: false },
      { start: '8:00am', end: '8:30am', is_available: false }, { start: '8:30am', end: '9:00am', is_available: false },
      { start: '9:00am', end: '9:30am', is_available: false }, { start: '9:30am', end: '10:00am', is_available: false },
      { start: '10:00am', end: '10:30am', is_available: false }, { start: '10:30am', end: '11:00am', is_available: false },
      { start: '11:00am', end: '11:30am', is_available: false }, { start: '11:30am', end: '12:00pm', is_available: false },
      { start: '12:00pm', end: '12:30pm', is_available: false }, { start: '12:30pm', end: '1:00pm', is_available: false },
      { start: '1:00pm', end: '1:30pm', is_available: false }, { start: '1:30pm', end: '2:00pm', is_available: false },
      { start: '2:00pm', end: '2:30pm', is_available: false }, { start: '2:30pm', end: '3:00pm', is_available: false },
      { start: '3:00pm', end: '3:30pm', is_available: false }, { start: '3:30pm', end: '4:00pm', is_available: false },
      { start: '4:00pm', end: '4:30pm', is_available: false }, { start: '4:30pm', end: '5:00pm', is_available: false },
      { start: '5:00pm', end: '5:30pm', is_available: false }, { start: '5:00pm', end: '6:00pm', is_available: false },
      { start: '6:00pm', end: '6:30pm', is_available: false }, { start: '6:30pm', end: '7:00pm', is_available: false },
      { start: '7:00pm', end: '7:30pm', is_available: false }, { start: '7:30pm', end: '8:00pm', is_available: false },
      { start: '8:00pm', end: '8:30pm', is_available: false }, { start: '8:30pm', end: '9:00pm', is_available: false },
      { start: '9:00pm', end: '9:30pm', is_available: false }, { start: '9:30pm', end: '10:00pm', is_available: false },
      { start: '10:00pm', end: '10:30pm', is_available: false }, { start: '10:30pm', end: '11:00pm', is_available: false }
    ]
  }

  static Request = class {
    static abortController = null
    constructor(NOT_JSON = false, api_address = process.env.REACT_APP_LOOPBACK_IP) {
      this.headers = NOT_JSON ? {} : { 'Content-Type': 'application/json' }
      this.api_address = api_address
    }

    setAuthorization(token) {
      this.headers['Authorization'] = token;
    }

    setOtherHeader(key, value) {
      this.headers[key] = value;
    }

    static abortProcesses() {
      if (Utils.Request.abortController != null) {
        Utils.Request.abortController.abort();
      }
    }

    GET(endpoint) {
      Utils.Request.abortController = new AbortController()
      try {
        return fetch(this.api_address + endpoint, {
          signal: Utils.Request.abortController.signal,
          headers: this.headers
        });
      } catch (err) {
        alert(Utils.ERROR_MESSAGE + err)
        return null;
      }
    }

    POST(endpoint, body) {
      Utils.Request.abortController = new AbortController()
      try {
        return fetch(this.api_address + endpoint, {
          signal: Utils.Request.abortController.signal,
          method: "POST",
          headers: this.headers,
          body: body
        });
      } catch (err) {
        alert(Utils.ERROR_MESSAGE + err)
        return null;
      }
    }


    PUT(endpoint, body) {
      Utils.Request.abortController = new AbortController()
      try {
        return fetch(this.api_address + endpoint, {
          signal: Utils.Request.abortController.signal,
          method: "PUT",
          headers: this.headers,
          body: body
        });
      } catch (err) {
        alert(Utils.ERROR_MESSAGE + err)
        return null;
      }
    }

    PATCH(endpoint, body) {
      Utils.Request.abortController = new AbortController()
      try {
        return fetch(this.api_address + endpoint, {
          signal: Utils.Request.abortController.signal,
          method: "PATCH",
          headers: this.headers,
          body: body
        });
      } catch (err) {
        alert(Utils.ERROR_MESSAGE + err)
        return null;
      }
    }

    DELETE(endpoint, body) {
      Utils.Request.abortController = new AbortController()
      try {
        return fetch(this.api_address + endpoint, {
          signal: Utils.Request.abortController.signal,
          method: "DELETE",
          headers: this.headers,
          body: body
        });
      } catch (err) {
        alert(Utils.ERROR_MESSAGE + err)
        return null;
      }
    }
  }

  static logout() {
    window.localStorage.clear();
    window.sessionStorage.clear()
    window.location.reload(true);
  }

  static async isAuth() {
    const loggedUser = Utils.getLoggedUser()
    if (loggedUser) {
      var req = new Utils.Request()
      const endpoint = '/site_users/checkTokenValidation'
      let response = await req.POST(endpoint, JSON.stringify({ "access_token": loggedUser.token }))
      return response.status === 200
    }
    return false
  }


  static listenToStorageSet(handler) {
    if (typeof handler !== "function") {
      alert('ERROR: listenToLocalStorage was expecting a function but receive other type.')
    }
    Storage.prototype._setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      var evt = new CustomEvent('storageSet', { detail: { type: 'set', key: key, value: value } });
      window.dispatchEvent(evt);
      this._setItem(key, JSON.stringify(value));
    }
    window.addEventListener('storageSet', handler, true)
  }

  static listenToStorageClear(handler) {
    if (typeof handler !== "function") {
      alert('ERROR: listenToLocalStorage was expecting a function but receive other type.')
    }
    Storage.prototype._clear = Storage.prototype.clear;
    Storage.prototype.clear = function () {
      var evt = new CustomEvent('storageClear', { detail: { type: 'clear' } })
      window.dispatchEvent(evt);
      this._clear();
    }
    window.addEventListener('storageClear', handler, true)
  }

}

export default Utils;
