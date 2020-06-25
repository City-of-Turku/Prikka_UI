import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Categories, Category} from '../types';
import {i18n} from "../i18n";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            verticalAlign: 'middle',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface ICategorySelect {
    t(key, opts?): Function;
    selectedCategoryId: string;
    categories: Categories;
    handleCategoryFilterChange(categoryId: string): void;
    required?: boolean;
    fullWidth?: boolean;
}

const CategorySelect: React.FC<ICategorySelect> = ({
    t,
    selectedCategoryId,
    categories,
    handleCategoryFilterChange,
    required = false,
    fullWidth = false,
}) => {
    //Contexts
    const classes = useStyles();

    //States
    const [categoryId, setCategoryId] = React.useState(selectedCategoryId);
    const [localename, setLocalename] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<any>) => {
        const categoryId: string = event.target.value as string;
        setCategoryId(categoryId);
        handleCategoryFilterChange(categoryId);
    };

/*    const preSelectCategory = () => {
        if (selectedCategoryId!=null && selectedCategoryId!='0'){
            const tmpCategory = (categories.find(x => x.id.toString() == selectedCategoryId).name);
            setCategory(tmpCategory);
            //selectedCategoryId = null;
        };
    };
*/
    useEffect(() => {
        let temp = 'name' +i18n.language.toUpperCase();
        setLocalename(temp);
//        console.log(localename);
//        preSelectCategory();
        /*if (selectedCategoryId!=null && selectedCategoryId!='0'){
            const tmpCategory = (categories.find(x => x.id.toString() == selectedCategoryId).name);
            setCategory(tmpCategory);
            selectedCategoryId = null;
        }*/
    });

    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
            fullWidth={fullWidth}
            style={{ margin: '0px' }}
            required={required}
        >
            <InputLabel id="demo-simple-select-outlined-label">
                {t('category')}
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={categoryId}
                onChange={handleChange}
                label={t('category')}
            >
                <MenuItem value="">{t('alternativeAll')}</MenuItem>
                {categories
                    ? categories.map((category: Category, index: number) => {
                          return (
                              <MenuItem key={index} value={category.id}>
                                  {category[localename]}
                              </MenuItem>
                          );
                      })
                    : null}
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
