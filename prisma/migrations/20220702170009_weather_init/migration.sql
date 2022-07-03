-- CreateTable
CREATE TABLE "WeatherData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "app_temp" REAL NOT NULL,
    "aqi" INTEGER NOT NULL,
    "city_name" TEXT NOT NULL,
    "clouds" INTEGER NOT NULL,
    "country_code" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "dewpt" REAL NOT NULL,
    "dhi" REAL NOT NULL,
    "dni" REAL NOT NULL,
    "elev_angle" REAL NOT NULL,
    "ghi" REAL NOT NULL,
    "h_angle" REAL NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "ob_time" TEXT NOT NULL,
    "pod" TEXT NOT NULL,
    "precip" INTEGER NOT NULL,
    "pres" REAL NOT NULL,
    "rh" INTEGER NOT NULL,
    "slp" REAL NOT NULL,
    "snow" INTEGER NOT NULL,
    "solar_rad" REAL NOT NULL,
    "state_code" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "sunrise" TEXT NOT NULL,
    "sunset" TEXT NOT NULL,
    "temp" REAL NOT NULL,
    "timezone" TEXT NOT NULL,
    "vis" INTEGER NOT NULL,
    "uv" REAL NOT NULL,
    "ts" INTEGER NOT NULL,
    "weatherCode" INTEGER NOT NULL,
    "wind_cdir" TEXT NOT NULL,
    "wind_cdir_full" TEXT NOT NULL,
    "wind_dir" INTEGER NOT NULL,
    "wind_spd" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WeatherData_weatherCode_fkey" FOREIGN KEY ("weatherCode") REFERENCES "Weather" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Weather" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Weather_code_key" ON "Weather"("code");
