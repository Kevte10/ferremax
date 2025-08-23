import wspLogo from '../images/wsp.png';

function WhatsappBtn() {
    return (
        <a
            href="https://wa.me/51923922914"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-white hover:bg-gray-200 rounded-full p-2 shadow-lg transition flex items-center justify-center"
        >
            
            <img
                src={wspLogo}
                alt="WhatsApp"
                className="w-12 h-12" // ajusta el tamaño a lo que necesites
            />
        </a>
    );
}

export default WhatsappBtn;
