import {BehaviorSubject, Observable} from "rxjs";
import type {ToastData} from "@/components/toast/ToastData";

export class ToastService {
  private static readonly toastsSubject: BehaviorSubject<ToastData[]> = new BehaviorSubject<ToastData[]>([]);
  public static readonly toasts$: Observable<ToastData[]> = ToastService.toastsSubject.asObservable();

  public static addToast(title: string, body: string): ToastData {
    const toast: ToastData = {
      id: Math.random().toString(15),
      title: title,
      body: body,
      timestamp: new Date()
    }
    ToastService.toastsSubject.next([...ToastService.toastsSubject.value, toast]);

    return toast;
  }

  public static removeToast(toastId: string) {
    ToastService.toastsSubject.next(ToastService.toastsSubject.value.filter(t => t.id !== toastId));
  }
}
