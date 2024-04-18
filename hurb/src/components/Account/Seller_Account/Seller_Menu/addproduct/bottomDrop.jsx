export default function bottomDrop({onSelectSubCategory}){
    const handleSubCategoryChange = (e) => {
        onSelectSubCategory(e.target.value);
    };
    return (
        <>
                    <option value="Pants">Pants</option>
                    <option value="Chinos">Chinos</option>
                    <option value="Denim">Denim</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Bikini">Bikini</option>
        </>
    );
}