import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private dataService: DataService) { }

  getAllPackages(data: any) {
    return this.dataService.POST('/packagelist/getAllPackagesByUserId', data);
  }

  updatePackage(id, data) {
    return this.dataService.PUT(`/packagelist/updatePackageById/${id}`, data);
  }

  deletePackage(id) {
    return this.dataService.DELETE(`/packagelist/deletePackageById/${id}`);
  }

  createPackage(data) {
    return this.dataService.POST(`/packagelist/createPackage`, data);
  }
}
