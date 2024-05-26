import AddAvatar from "@components/pictures/add-avatar";
import { Button } from "@components/ui/button";
import { DatePicker } from "@components/ui/date-picker";
import { Input } from "@components/ui/input";
import defaultPP from '@assets/images/default.png';

interface RegisterSubPageProps {
  changeMode: any;
}

export default function RegisterSubPage({ changeMode }: RegisterSubPageProps) {
  
  return (
    <div className="mx-auto grid w-[350px] gap-6 lg:w-full lg:max-w-[700px]">
      <div className="grid gap-2">
        <h1 className="text-4xl font-extrabold">Sign Up</h1>
        <p className="text-balance text-muted-foreground pb-4">
          Create an account by filling in the information below
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-4">
        <Input id="nim" type="text" required placeholder="NIM" />
        <Input id="email" type="email" required placeholder="Email" />
        <Input id="firstName" type="text" required placeholder="First Name" />
        <Input id="lastName" type="text" required placeholder="Last Name" />
        <Input id="phoneNumber" type="tel" required placeholder="Phone Number" />
        <DatePicker placeholder="Date Of Birth" className="col-span-2 lg:col-span-1"/>
      </div>
      <Button type="submit" className="w-full font-bold h-12">
        Sign Up
      </Button>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="orange-text-color font-semibold underline" onClick={() => changeMode('login')}>
          Log In
        </a>
      </div>
    </div>
  );
}
