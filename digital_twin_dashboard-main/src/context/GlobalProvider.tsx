import type { OptionItem } from '../types';
import { useContext, useEffect, useState } from 'react';
import Global from './global-context';
import Api from './api-context';

type GlobalProviderProps = {
    children: React.ReactElement[] | React.ReactElement;
};

const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const { getUserTypes, login: apiLogin } = useContext(Api);

    const processModes: OptionItem[] = [
        { id: 1, name: 'Real' },
        { id: 2, name: 'Simulation' },
    ];

    const [userTypes, setUserTypes] = useState<OptionItem[]>();
    const [selectedProcessMode, setSelectedProcessMode] = useState<OptionItem>(processModes[0]);
    const [selectedUserType, setSelectedUserType] = useState<OptionItem>();
    const [globalTemperature, setGlobalTemperature] = useState<number>();
    const [globalHumidty, setGlobalHumidty] = useState<number>();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    const getUserTypesFromApi = async () => {
        try {
            const data = await getUserTypes();

            if (data) {
                setUserTypes(data);
                setSelectedUserType(data[0]);
            }
        } catch (_err: unknown) {
            console.log('Something went wrong');
            console.log(_err);
        }
    };

    const getGlobalTempAndHumidity = async () => {
        setGlobalTemperature(23.5);
        setGlobalHumidty(45);
    };

    const login = async (username: string, password: string) => {
        const result = await apiLogin(username, password);
        if (result) setIsUserLoggedIn(result);
        return result;
    };

    const logout = async () => {
        setIsUserLoggedIn(false);
    };

    useEffect(() => {
        getUserTypesFromApi();
        getGlobalTempAndHumidity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const globalContext = {
        userTypes: userTypes,
        selectedUserType: selectedUserType,
        setSelectedUserType: setSelectedUserType,
        processModes: processModes,
        selectedProcessMode: selectedProcessMode,
        setSelectedProcessMode: setSelectedProcessMode,
        globalTemperature: globalTemperature,
        globalHumidity: globalHumidty,
        login: login,
        isUserLoggedIn: isUserLoggedIn,
        logout: logout,
    };

    return <Global.Provider value={globalContext}>{children}</Global.Provider>;
};

export default GlobalProvider;
