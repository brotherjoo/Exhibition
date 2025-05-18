export class SwallowResponse {
  constructor(id: number, temp: number, lon: number, lat: number, date: Date) {
    this.id = id;
    this.temp = temp;
    this.lon = lon;
    this.lat = lat;
    this.date = date;
  }

  id: number;
  temp: number;
  lon: number;
  lat: number;
  date: Date;

  static builder(): SwallowBuilder {
    return new SwallowBuilder();
  }
}

class SwallowBuilder {
  id: number;
  temp: number;
  lon: number;
  lat: number;
  date: Date;

  setId(id: number): SwallowBuilder {
    this.id = id;
    return this;
  }

  setTemp(temp: number): SwallowBuilder {
    this.temp = temp;
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

  setDate(date: Date): SwallowBuilder {
    this.date = date;
    return this;
  }

  build(): SwallowResponse {
    return new SwallowResponse(
      this.id,
      this.temp,
      this.lon,
      this.lat,
      this.date,
    );
  }
}
