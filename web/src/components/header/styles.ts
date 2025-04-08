const Nav:string ="navbar bg-base-100 border-b border-b-black";
const start:string = "navbar-start";
const center:string = "navbar-center";
const enlacePaginaPrincipal:string = "h-auto w-auto flex items-center";
const end:string = "navbar-end";
const menu:string = "btn btn-ghost text-xs uppercase tracking-wider";
const svg:string = "ml-2 h-4 w-4";
const panelLateral:string = "fixed top-0 right-0 h-screen w-40 bg-black text-white rounded-l-[40px] shadow-lg transform transition-transform duration-300 z-50 flex flex-col items-end p-2 space-y-5";
const a:string = "text-[0.9rem] p-2 hover:underline";
const contenedorInvisible:string = "fixed inset-0 bg-transparent bg-opacity-50 z-40";

const styles = {
	Nav,
	start,
	center,
	enlacePaginaPrincipal,
	end:{
		end,
		menu,
		svg,
		panelLateral,
		a,
		contenedorInvisible
	}
};
export default styles;