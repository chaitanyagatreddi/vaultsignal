import UserPng from '@/assets/pngs/user-test.png'

function User() {
    return (
        <div className="flex items-center gap-4">
            <img
                className="w-8 h-8 rounded-full object-cover border-2 border-white ring-1 ring-[#D4D4D8]"
                src={UserPng}
                alt=""
            />
            <div className="leading-4 text-[12px]">
                <p className="font-semibold text-[#18181B]">Admin</p>
                <p className="font-normal text-[#71717A]">Security Admin</p>
            </div>
        </div>
    )
}

export default User
