/**
 * Redimensiona e comprime uma imagem no navegador (via canvas) e devolve
 * um data URL base64 pronto para salvar no Firestore.
 *
 * Fica pequeno de propósito: como a foto vai dentro do próprio documento do
 * Firestore (sem usar o Storage, que exige plano pago), o resultado final
 * precisa caber bem abaixo do limite de 1MB por documento.
 */
export function fileToCompressedDataUrl(file, { maxWidth = 480, quality = 0.6 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('O arquivo selecionado não é uma imagem.'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Não foi possível abrir a imagem.'))
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)

        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)

        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
