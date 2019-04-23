import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  closeSwal() {
    Swal.close();
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 3000
  });

  toast(typ: any, msgg: string) {
    this.Toast.fire({
      type: typ,
      title: msgg
    })
  }
}
