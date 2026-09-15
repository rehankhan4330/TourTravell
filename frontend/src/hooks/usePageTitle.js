import { useEffect } from "react";

function usePageTitle(title) {
    useEffect(() => {
        document.title = `${title} | Al Safar Travels`;
    }, [title]);
}

export default usePageTitle;