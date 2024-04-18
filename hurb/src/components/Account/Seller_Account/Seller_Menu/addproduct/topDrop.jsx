export default function topDrop({onSelectSubCategory}){
    const handleSubCategoryChange = (e) => {
        onSelectSubCategory(e.target.value);
    };
    return(
        <>
                   <option value="Shirts">Shirts</option>
                   <option value="Polos">Polos</option>
                   <option value="Henleys">Henleys</option>
                   <option value="T-Shirts">T-Shirts</option>
                   <option value="Dresses">Dresses</option>
                   <option value="Blouses & Tops">Blouses & Tops</option>
                   <option value="Sweater & Vests">Sweater & Vests</option>
                   <option value="Jumpsuits">Jumpsuits</option>
                   <option value="Blazers">Blazers</option>
        </>
    )
}