import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import Global from '../../context/global-context';
import Role from '../../context/role-context';
import Dropdown from '../UI/Dropdown';

const Login = () => {
    const { login } = useContext(Global);
    const { processPage, orderPage } = useContext(Role);
    const { userTypes, selectedUserType, setSelectedUserType } = useContext(Global);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username && password) {
            const success = await login(username, password);
            if (success) {
                if ((processPage && orderPage) || processPage) {
                    navigate('/process');
                } else if (orderPage) {
                    navigate('/order');
                }
            }
        }
    };

    return (
        <div className="flex justify-center w-screen h-screen">
            <form
                onSubmit={onSubmit}
                className="relative min-w-[550px] w-1/4 max-h-[20vh] mt-[10%] bg-violet-800 rounded-lg shadow-lg p-10 py-45 border flex items-center justify-center"
            >
                <div className="flex flex-col gap-5 w-[80%] items-center">
                    <h2 className="text-neutral-50 text-3xl self-start font-semibold">Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                        className="bg-neutral-50 rounded-md h-10 px-2 py-3 focus:outline-none focus:ring-4 focus:ring-amber-300 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="bg-neutral-50 rounded-md h-10 px-2 py-3 focus:outline-none focus:ring-4 focus:ring-amber-300 w-full"
                    />
                    {userTypes && selectedUserType && (
                        <div className="mt-4">
                            <Dropdown
                                options={userTypes}
                                value={selectedUserType}
                                onChange={setSelectedUserType}
                            />
                        </div>
                    )}
                    <button
                        className="bg-amber-300 rounded-md w-[70%] p-2 mt-5 hover:cursor-pointer hover:scale-110 transition-all ease-in-out disabled:cursor-auto disabled:scale-100 disabled:bg-amber-200 font-semibold"
                        disabled={!(password && username)}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Login;
