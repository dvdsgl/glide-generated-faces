(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/column.ts
  function column_default(seed, key) {
    return __async(this, null, function* () {
      seed = seed.value;
      if (seed === void 0)
        return void 0;
      key = key.value;
      if (key === void 0)
        return void 0;
      return seed;
    });
  }

  // src/index.ts
  function convert(x) {
    if (x instanceof Date) {
      return x.toISOString();
    } else if (Array.isArray(x)) {
      return x.map(convert);
    } else {
      return x;
    }
  }
  window.addEventListener("message", function(event) {
    return __async(this, null, function* () {
      var _a;
      const {
        origin,
        data: { key, params }
      } = event;
      let result;
      let error;
      try {
        result = yield column_default(...params);
      } catch (e) {
        result = void 0;
        try {
          error = e.toString();
        } catch (e2) {
          error = "Exception can't be stringified.";
        }
      }
      const response = { key };
      if (result !== void 0) {
        result = convert(result);
        response.result = { type: "string", value: result };
      }
      if (error !== void 0) {
        response.error = error;
      }
      ((_a = event.source) == null ? void 0 : _a.postMessage).call(_a, response, "*");
    });
  });
})();
