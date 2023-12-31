export const getInitials = (firstName: string, lastName: string): string => {
    let initials = "";
  
    if (firstName && lastName) {
      initials = firstName.charAt(0) + lastName.charAt(0);
    } else if (firstName) {
      initials = firstName.charAt(0);
    } else if (lastName) {
      initials = lastName.charAt(0);
    }
  
    return initials.toUpperCase();
  };

  export const getName = (displayName: string): string[] => {
    const names = displayName.split(" ");
  
    return names.length >= 2 ? [names[0], names[names.length - 1]] : []; // Return first and last name, or an empty array if not enough names
  };
  