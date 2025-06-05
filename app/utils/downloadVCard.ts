// downloadVCard.ts

const handleDownloadVCard = () => {
  console.log("Iniciando descarga de la tarjeta de visita...")

  // URL de la imagen local - cambiar por el logo de Ushuaia Bar
  const imageUrl = "/images-3copia.png"

  fetch(imageUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener la imagen: ${res.statusText}`)
      }
      return res.blob()
    })
    .then((blob) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1]
        console.log("Imagen convertida a Base64.")

        const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Ushuaia Bar
ORG:Fushuaia & Cantina 
ADR:;;Bahnhofstrasse 40;Buchs;;9470;Switzerland
TEL:+41817560101
EMAIL:info@ushuaia-bar.ch
URL:https://ushuaia-bar.ch
PHOTO;ENCODING=b;TYPE=JPEG:${base64data}
END:VCARD`

        const vCardBlob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(vCardBlob)
        link.download = "Ushuaia_Bar.vcf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log("Archivo .vcf descargado con imagen.")
      }
      reader.onerror = (error) => {
        console.error("Error al leer la imagen:", error)
        alert("Ocurrió un error al procesar la imagen para la tarjeta de visita.")
      }
      reader.readAsDataURL(blob)
    })
    .catch((error) => {
      console.error("Error al cargar la imagen:", error)
      alert("Ocurrió un error al descargar la tarjeta de visita. Se descargará sin imagen.")

      // Crear vCard sin la imagen
      const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Ushuaia Bar
ORG:Flomic GmbH
ADR:;;Bahnhofstrasse 40;Buchs;;9470;Switzerland
TEL:+41817560101
EMAIL:info@ushuaia-bar.ch
URL:https://ushuaia-bar.ch
END:VCARD`

      const vCardBlob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(vCardBlob)
      link.download = "Ushuaia_Bar.vcf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log("Archivo .vcf descargado sin imagen.")
    })
}

export default handleDownloadVCard
