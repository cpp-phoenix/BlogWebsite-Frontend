class SearchCriteria{

    searchBy;

    setSearchby(searchBy){
        this.searchBy = searchBy;
    }

    getSearchBy(){
        return this.searchBy || SearchCriteriaTypes.DEFAULT;
    }

}

export const SearchCriteriaTypes = {
    LIKED_BY_USERS: 'likedByUsers',
    FOLLOWING: 'following',
    DEFAULT: "default"
}

const search_criteria_singleton = new SearchCriteria();
export default search_criteria_singleton;