import UserPng from '@/assets/pngs/user-test.png'
function User() {
    return (
        <div className="flex gap-4">
            <img className="w-[3rem] h-[3rem]" src={UserPng} />
            <div>
                <b>Julie Doe</b>
                <br />
                <p>Security Admin</p>
            </div>
        </div>
    )
}

export default User
