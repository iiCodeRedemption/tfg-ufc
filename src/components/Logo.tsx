import Image from "next/image"

export function Logo() {
  return (
    <div style={{ position: "relative", width: "150px", height: "175px" }}>
      <Image
        src="/imgs/logo-bg.webp"
        alt="Logo"
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}
