export const Banner = () => {
	return (
		<div className='relative bg-gray-900 text-white'>
			{/* IMAGEN DE FONDO */}
			<div
				className='absolute inset-0 bg-cover bg-center opacity-70 h-full'
				style={{ backgroundImage: 'url(/img/img-banner.jpg)' }}
			/>

			{/* OVERLAY */}
			<div className='absolute inset-0 bg-black opacity-50' />

			{/* CONTENIDO */}
			<div className='relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8'>
				<div className='relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center lg:py-40 lg:px-8'>
            <h1>¡Bienvenidos a nuestra nueva tienda en línea!</h1>
            
            <h3>Estamos emocionados de presentarles nuestro nuevo diseño web, con una experiencia de compra en línea más fácil y rápida.</h3>
            
            <h2>¡Gracias por elegirnos!</h2> 
        </div>

			</div>
		</div>
	);
};