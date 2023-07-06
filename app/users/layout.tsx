import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function UserLayout({children} : {children: React.ReactNode}) {
    return (
        //@ts-ignore
        <Sidebar>
        <div className="hidden lg:block lg:pl-80 h-full">
            {children}
        </div>
        </Sidebar>
    );
}