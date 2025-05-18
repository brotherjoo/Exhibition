export class SwallowReq {
  constructor(lon: number, lat: number, date: Date, file: Express.Multer.File) {
    this.lon = lon;
    this.lat = lat;
    this.date = date;
    this.file = file;
  }

  lon: number;
  lat: number;
  date: Date;
  file: Express.Multer.File;

  static builder(): SwallowBuilder {
    return new SwallowBuilder();
  }
}

class SwallowBuilder {
  date: Date;
  lon: number;
  lat: number;
  file: Express.Multer.File;

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

  setFile(file: Express.Multer.File): SwallowBuilder {
    this.file = file;
    return this;
  }

  build(): SwallowReq {
    return new SwallowReq(this.lon, this.lat, this.date, this.file);
  }
}
