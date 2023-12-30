function contieneNumero(str) {
    return /\d/.test(str);
}

function esURL(str) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(str);
}


export default function validation({name, hp, attack, defense, speed, height, weight, typesNames, imageClassic, image3d, imageArtistic}) {
    
    let errors = {};

    // Validaciones de name
    if(contieneNumero(name)) errors.nameValidation = "Name must not contain numbers"
    if(!name) errors.nameNotNull = "Name can't be empty"
    
    // Validaciones de hp, attack y defense
    const mandatoryStats = {hp, attack, defense}
    for(const key in mandatoryStats) {
        const elem = mandatoryStats[key];
        if(elem > 150 || elem < 0) errors[`${key}Validation`] = "Must be between 0 and 150";
        if(!elem) errors[`${key}NotNull`] = `${key[0].toUpperCase() + key.slice(1)} can't be empty`
    }

    // Validaciones de speed    
    if(speed > 150 || speed < 0) errors.speedValidation = "Must be between 0 and 150"
    
    // Validaciones de height
    if(height < 0) errors.heightValidation = "Must be greater than 0"

    // Validaciones de weight
    if(weight < 0) errors.weightValidation = "Must be greater than 0"

    // Validaciones de types
    if(typesNames.length === 0) errors.typesNamesValidation = "Choose at least one type"

    // Validaciones de images
    const images = {imageClassic, image3d, imageArtistic}
    for(const key in images) {
        const elem = images[key];
        if(elem && !esURL(elem)) errors[`${key}Validation`] = "Must be a URL"
    }
    if(!imageClassic) errors.imageClassicNotNull = "Main image can't be empty"

    return errors;
}