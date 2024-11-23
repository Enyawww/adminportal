import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Command } from "cmdk";
import { FiEye, FiLink, FiLogOut, FiPhone, FiPlus, FiLoader } from "react-icons/fi";
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

interface CommandMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ open, setOpen }) => {
  const [value, setValue] = useState(""); // Define state for the input value
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Define state for logout loading
  const router = useRouter(); // Initialize router for redirection

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  // Handle Logout Function
  const handleLogout = () => {
    setIsLoggingOut(true); // Set loading state to true

    // Simulate logout process
    setTimeout(() => {
      // Remove the stored data from localStorage
      localStorage.removeItem('username');
      localStorage.removeItem('isAuthenticated');

      // Redirect the user to the login page
      router.push('/');

      // Set loading state to false after redirect
      setIsLoggingOut(false);
    }, 1500); // 1.5 second delay for a smoother effect
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl border-stone-300 overflow-hidden w-full max-w-lg mx-auto mt-12"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="what do you need?"
          className="relative border-b border-stone-200 p-3 text-m w-full placeholder:text-stone-400 focus:outline-none"
        />
        <Command.List className="p-3">
          <Command.Empty>
            No results found for{" "}
            <span className="text-purple-500">"{value}"</span>
          </Command.Empty>
          
          {/*Team*/}
          <Command.Group
            heading="Team"
            className="text-sm pl-3 mb-3 text-stone-400"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-purple-100 rounded items-center gap-2">
              <FiPlus />
              Invite Member
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-purple-100 rounded items-center gap-2">
              <FiEye /> Org Chart
            </Command.Item>
          </Command.Group>

          {/*Integrations*/}
          <Command.Group
            heading="Integrations"
            className="text-sm pl-3 mb-3 text-stone-400"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiLink />
              Link Services
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-stone-950 hover:bg-stone-200 rounded items-center gap-2">
              <FiPhone /> Contact Support
            </Command.Item>
          </Command.Group>

          {/*Logout*/}
          <Command.Item
            onSelect={handleLogout} // Trigger the logout handler when clicked
            className={`flex cursor-pointer transition-colors p-2 text-sm items-center gap-2 ${
              isLoggingOut ? 'bg-stone-400 text-stone-700' : 'text-stone-50 hover:bg-stone-700 bg-stone-950'
            } rounded`}
            disabled={isLoggingOut} // Disable interaction when logging out
          >
            {isLoggingOut ? (
              <>
                <FiLoader className="animate-spin" /> Logging Out...
              </>
            ) : (
              <>
                <FiLogOut /> Log Out
              </>
            )}
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
