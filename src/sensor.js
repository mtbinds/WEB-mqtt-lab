
export const version = () => "1.0.0";

/* TP Réalisé avec ECMASript 6 (class) Pattern */

export const Enumeration = function (keys) {
  const enumeration = Object.create(null);
  for (const key of keys) {
    enumeration[key] = key;
  }
  enumeration[Symbol.iterator] = function* () {
    for (const key of keys) {
      yield enumeration[key];
    }
  };
  Object.freeze(enumeration);
  return enumeration;
};


export var myEnum = new Enumeration(['TEMPERATURE', 'PERCENT', 'OPEN_CLOSE', 'ON_OFF']);


export class Sensor {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
  }

  get id() { return this._id || 0; }
  set id(val) { this._id = val; }
  get name() { return this._name || 0; }
  set name(val) { this._name = val; }
  get value() { return this._value || 0; }
  set value(val) { this._value = val; }

  // Time series : value, date - Datum : value | new Date()
  static createSensor(id, name, value, type) {
    let data;
    switch(type) {
      case myEnum.TEMPERATURE:
        data = new TimeSeries([+value], [new Date()]);
        return new Temperature(id, name, data);
      case myEnum.PERCENT:
        data = new Datum(value*100);
        return new Percent(id, name, data);
      case myEnum.OPEN_CLOSE:
        data = new Datum(value);
        return new Door(id, name, data);
      case myEnum.ON_OFF:
        data = new Datum(value);
        return new Light(id, name, data);
      default:
        data = new TimeSeries([+value], [new Date()]);
        return new Other(id, name, data);
    }
  }
}


export class Temperature extends Sensor {}
export class Percent extends Sensor {}
export class Door extends Sensor {}
export class Light extends Sensor {}
export class Other extends Sensor {}
export class Data {}


export class TimeSeries extends Data {
  constructor(values, date) {
    super();
    this.values = values;
    this.date = date;
  }

  get values() { return this._values || 0; }
  set values(val) { this._values = val; }
  get date() { return this._date || 0; }
  set date(val) { this._date = val; }
}


export class Datum extends Data {
  constructor(value) {
    super();
    this._value = value;
  }

  get value() { return this._value || 0; }
  set value(val) { this._value = val; }
}
