import HeroAnimation from "../Home/HeroAnimation";

export const Banner = () => {
  return (
    <div className="relative bg-gray-900 text-white h-screen overflow-hidden">

      {/* IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/img/Gemini_Generated_Image_9lz5x99lz5x99lz5.png')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENIDO */}

        <HeroAnimation 
          title="¡Bienvenidos a nuestra nueva tienda en línea!"
          subtitle="Estamos emocionados de presentarles nuestro nuevo diseño web, con una experiencia de compra en línea más fácil y rápida."
        />
	    <HeroAnimation 
          title="¡Gracias por elegirnos!"
	      subtitle=""
        />
		
		
   
    </div>
  );
};