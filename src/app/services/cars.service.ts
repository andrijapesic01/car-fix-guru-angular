import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car/car.model';
import { environment } from 'src/environments/environment';
import { CreateModCarDto } from '../models/car/create-mod-car.dto';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  
    private apiUrl = environment.api.apiUrl;

    constructor(private http: HttpClient) {

    }

    getAllCars() {
        return this.http.get<Car[]>(`${this.apiUrl}/cars`);
    }

    getCarById(id: string) {
        return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
    }

    addCar(carData: CreateModCarDto) {
        const body = carData;
        console.log("Service add car");
        return this.http.post<Car>(`${this.apiUrl}/cars/addCar`, body);
    }

    updateCar(carId: string, carData: CreateModCarDto) {
        const body = carData;
        return this.http.put<Car>(`${this.apiUrl}/cars/changeCar/${carId}`, body);
    }

    deleteCar(carId: string) {
        return this.http.delete<any>(`${this.apiUrl}/cars/deleteCar/${carId}`);
    }

    stringSearchCars(searchString: string) {
        return this.http.get<Car[]>(`${this.apiUrl}/cars/searchCars/${searchString}`);
    }

    getCarCategories() {
        return this.http.get<string[]>(`${this.apiUrl}/cars/carCategories`);
    }
}
