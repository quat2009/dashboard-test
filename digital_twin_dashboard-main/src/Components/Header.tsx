import Navigator from './UI/Header/Navigator';
import Settings from './UI/Header/Settings';
import OverView from './UI/Header/OverView';

const Header = () => {
    return (
        <header className="w-full bg-violet-800 text-white px-5 py-2 min-h-15 max-h-15 grid grid-cols-[20%_60%_20%] items-center">
            <Navigator />
            <Settings />
            <OverView />
        </header>
    );
};

export default Header;
