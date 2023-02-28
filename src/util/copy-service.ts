import {ToastService} from "@/util/toast-service";

export class CopyService {
  public static copy(text: string): void {
    navigator.clipboard.writeText(text)
    .then(() => {
      ToastService.addToast("Tekst kopieret", text);
    })
  }
}
