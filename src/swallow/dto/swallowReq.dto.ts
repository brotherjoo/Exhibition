export class SwallowReq {
  constructor(lon: number, lat: number, date: Date) {
    this.lon = lon;
    this.lat = lat;
    this.date = date;
  }

  lon: number;
  lat: number;
  date: Date;

  static builder(): SwallowBuilder {
    return new SwallowBuilder();
  }
}

class SwallowBuilder {
  date: Date;
  lon: number;
  lat: number;

  setDate(date: Date): SwallowBuilder {
    this.date = date;
    return this;
  }

  setLon(lon: number): SwallowBuilder {
    this.lon = lon;
    return this;
  }

  setLat(lat: number): SwallowBuilder {
    this.lat = lat;
    return this;
  }

  build(): SwallowReq {
    return new SwallowReq(this.lon, this.lat, this.date);
  }
}
