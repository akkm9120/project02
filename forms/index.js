const errors = require('bookshelf/lib/errors');
const forms = require('forms');
const { string } = require('forms/lib/fields');
const fields = forms.fields;
const validators = forms.validators;

const bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};
 
const createBurgerForm = ()=> {

    return forms.create({
        'item_name': forms.fields.string({
            required: true,
            errorAfterField: true 
        }),
        'cost': fields.number({
            required: true, 
            errorAfterField: true,
            validators: [validators.min(0), validators.integer()]
        }),
        'description': fields.string( {
            required: true,
            errorAfterField: true
        }),
        'img_url': fields.string ({ 
            required: true, 
            errorAfterField: true,
        }),
        'availavility' : fields.string( { 
            required: true , 
            errerAfterField: true , 
        })
    
    })
}

const loginForm = ()=> {
    return forms.create( { 
        'username': forms.fields.string({
            required: true, 
            errorAfterField: true,
        }),
        'password': forms.fields.string({
            required: true ,
            errorAfterField: true,
        })
    })
}

const registerForm = () => {
    return forms.create({
        'username': forms.fields.string({
            required: true, 
            errorAfterField: true,
        }),
        'ph_numer': forms.fields.string({
            required : true, 
            errorAfterField: true,
        }),
        'gender': forms.fields.string({
            required: true, 
            errorAfterField : true,  
        }),
        'password': forms.fields.string ( {
            required: true, 
            errorAfterField: true,
        })     
    })
}

module.exports = { bootstrapField,registerForm, loginForm, createBurgerForm}; 