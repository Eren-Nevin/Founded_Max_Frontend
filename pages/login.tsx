import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="container mx-auto my-5">
            <div className="grid grid-cols-1">
                <div className="text-center mb-5">
                    <h1 className="h1">Login</h1>
                </div>
                <form action="" >
                    <div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="block py-2.5 w-full text-sm  bg-transparent border border-b rounded-lg px-2    " placeholder="userName" />
                    </div>
                    <div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="block mt-5 py-2.5 w-full text-sm  bg-transparent border border-b rounded-lg px-2    " placeholder="password" />
                    </div>
                    <button className="btn border w-full rounded-lg py-1 bg-blue-300 text-black mt-5">Login</button>
                </form>
            </div>
        </div>
    )
}


export default Login