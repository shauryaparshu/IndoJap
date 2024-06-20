import React from "react";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import Label from "@/components/Label/Label";

const DashboardSubmitPost = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main content */}
      <main className="flex-1">
        {/* Header */}
        <header className=" shadow-md py-4 px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Page content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Welcome to your dashboard!
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            consectetur nisi at lectus varius, vel fermentum sem pharetra. Donec
            interdum orci in arcu dapibus malesuada.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardSubmitPost;
