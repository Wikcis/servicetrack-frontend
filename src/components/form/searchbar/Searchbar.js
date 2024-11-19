import {TextField} from "@mui/material";

export const Searchbar = ({ onSearch }) => {

    const handleInputChange = (e) => {
        const textToLowerCase = e.target.value.toLowerCase();

        onSearch(textToLowerCase);
    }

    return (
        <div className="searchbarInput">
            <TextField
                id="outlined-basic"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                label="Search"/>
        </div>

    )
}