$(document).ready(function(){
  
    // get the list of list of skills 
    // these come from running the csvtojson.py file, then cut and paste in here
    const dataSet = [['Cloud Computing', 'AWS Cognito', 'Intermediate', '2024'], ['Cloud Computing', 'AWS EC2', 'Advanced', '2024'], ['Cloud Computing', 'AWS Elastic Beanstalk', 'Intermediate', '2024'], ['Cloud Computing', 'AWS RDS', 'Advanced', '2024'], ['Cloud Computing', 'AWS S3', 'Advanced', '2024'], ['Collaboration', 'Confluence', 'Advanced', '2024'], ['Collaboration', 'Jira', 'Advanced', '2024'], ['Collaboration', 'Microsoft SharePoint', 'Advanced', '2023'], ['Collaboration', 'Microsoft Teams', 'Advanced', '2023'], ['Collaboration', 'Slack', 'Advanced', '2024'], ['Collaboration', 'Webex', 'Advanced', '2020'], ['Collaboration', 'Zoom', 'Advanced', '2024'], ['Database', 'Microsoft Access', 'Advanced', '2015'], ['Database', 'MySQL', 'Advanced', '2016'], ['Database', 'PostgreSQL', 'Advanced', '2024'], ['Database Tools', 'DbVisualizer', 'Advanced', '2024'], ['Database Tools', 'MySQL', 'Advanced', '2016'], ['Database Tools', 'MySQL Workbench', 'Advanced', '2016'], ['Database Tools', 'Tableau', 'Intermediate', '2019'], ['Database Tools', 'dBeaver', 'Intermediate', '2022'], ['Database Tools', 'pgAdmin', 'Advanced', '2024'], ['Development Tools', 'Atom', 'Intermediate', '2019'], ['Development Tools', 'Jupyter Notebook', 'Advanced', '2023'], ['Development Tools', 'Notepad++', 'Advanced', '2024'], ['Development Tools', 'PyCharm', 'Advanced', '2024'], ['Development Tools', 'Rstudio', 'Advanced', '2020'], ['Development Tools', 'Visual Studio Code', 'Advanced', '2024'], ['Genomics', ' Ensembl BioMart', 'Intermediate', '2022'], ['Genomics', ' FDA Adverse Event Reporting System (FAERS)', 'Intermediate', '2022'], ['Genomics', ' Gene Expression Omnibus (GEO)', 'Intermediate', '2022'], ['Genomics', ' Genome-wide Association Studies (GWAS) Catalog', 'Intermediate', '2022'], ['Genomics', ' Human Genome Organization (HUGO)', 'Intermediate', '2022'], ['Genomics', ' Kyoto Encyclopedia of Genes and Genomes (KEGG)', 'Beginner', '2022'], ['Genomics', ' National Center for Biotechnology Information (NCBI)', 'Beginner', '2022'], ['Genomics', ' Rat Genome Database (RGD)', 'Beginner', '2022'], ['Genomics', 'Cytoscape', 'Intermediate', '2022'], ['Geographic', 'ArcGIS', 'Advanced', '2014'], ['Interoperability', 'Fast Health Interoperability Resources (FHIR)', 'Beginner', '2022'], ['Interoperability', 'Protege', 'Beginner', '2022'], ['Interoperability', 'Web Ontology Language (OWL)', 'Intermediate', '2022'], ['Languages/Frameworks', 'C++', 'Intermediate', '2000'], ['Languages/Frameworks', 'CSS', 'Advanced', '2024'], ['Languages/Frameworks', 'D3', 'Intermediate', '2016'], ['Languages/Frameworks', 'Django', 'Advanced', '2024'], ['Languages/Frameworks', 'HTML', 'Advanced', '2024'], ['Languages/Frameworks', 'Java', 'Intermediate', '2022'], ['Languages/Frameworks', 'JavaScript', 'Advanced', '2024'], ['Languages/Frameworks', 'Python', 'Advanced', '2024'], ['Languages/Frameworks', 'R', 'Intermediate', '2021'], ['Languages/Frameworks', 'jQuery', 'Intermediate', '2024'], ['Office Suite', 'LibreOffice', 'Intermediate', '2023'], ['Office Suite', 'Microsoft Office', 'Advanced', '2024'], ['Operating Systems', 'Linux', 'Advanced', '2024'], ['Operating Systems', 'Mac', 'Intermediate', '2023'], ['Operating Systems', 'Windows', 'Advanced', '2024'], ['Presentation Tools', ' Adobe Premiere Elements', 'Advanced', '2022'], ['Presentation Tools', ' Inkscape', 'Beginner', '2020'], ['Presentation Tools', ' Lucidchart', 'Beginner', '2024'], ['Presentation Tools', ' PowerPoint', 'Advanced', '2024'], ['Presentation Tools', ' iMovie', 'Advanced', '2016'], ['Presentation Tools', ' iPhoto', 'Advanced', '2000'], ['Presentation Tools', 'Adobe Photoshop', 'Advanced', '2024'], ['Reference Management', 'Endnote', 'Advanced', '2017'], ['Reference Management', 'Sciwheel', 'Intermediate', '2023'], ['Software as a Service (SaaS)', 'Terraform', 'Beginner', '2024'], ['Version Control', 'Bitbucket', 'Intermediate', '2016'], ['Version Control', 'Git', 'Advanced', '2024'], ['Version Control', 'GitHub', 'Advanced', '2024']]
    ;

    const dom_outer_ids = ['home', 'about', 'skill', 'education', 'certification', 'experience', 'publication']
    let outer_elements = dom_outer_ids.map(function(id) {
        return document.getElementById(id);
    })

    const dom_nav_ids = ['#home_nav', '#about_nav', '#skill_nav', '#education_nav', '#certification_nav', '#experience_nav', '#publication_nav', '#expand_nav', '#close_nav', '#print_nav'];    

    // on open, close all except the active one, which is the home_nav
    expand_or_close_prepare('home_nav');
      
    document.getElementById('navbar').addEventListener('click', function(e) {
        i = 0
        while (i < dom_nav_ids.length) {
            $(dom_nav_ids[i]).removeClass('active');
            i = i + 1;
        };       
        $(e.target).addClass('active');
        expand_or_close_prepare(e.target.id);
    });

    function expand_or_close_prepare(target_id) {   
        // console.log('target_id', target_id)     
        // have to open in order so all can be accessed
        expand_or_close('o', 'removeClass', 'd-none', 'outer_div', target_id);
        // expand_or_close('p0', 'removeClass', 'd-none', 'no-print0', target_id);
        expand_or_close('p1', 'removeClass', 'd-none', 'no-print1', target_id);
        expand_or_close('p2', 'removeClass', 'd-none', 'no-print2', target_id);
        expand_or_close('e', 'removeClass', 'd-none', 'div_button', target_id);
        expand_or_close('e', 'removeClass', 'd-none', 'div_button', target_id);

        if (target_id === 'expand_nav') {
        } else if (target_id === 'close_nav') {
            expand_or_close('c', 'addClass', 'd-none', 'div_button', target_id);
        } else if (target_id === 'print_nav') {
            expand_or_close('p2', 'addClass', 'd-none', 'no-print2', target_id);
            expand_or_close('p1', 'addClass', 'd-none', 'no-print1', target_id);
        } else {
            // this will be one of the options other than the hidden ones (close, expand, expand some)
            // close all the button next sibling
            expand_or_close('c', 'addClass', 'd-none', 'div_button', target_id);
            // open the button next sibling for the active nav
            expand_or_close('a', 'removeClass', 'd-none', 'div_button', target_id);
            // close the outer divs that are NOT the active ones
            expand_or_close('n', 'addClass', 'd-none', 'outer_div', target_id);
        }
    }

    function expand_or_close(e_c_p, add_remove, change_class_name, find_name, target_id) {
        var elements = null;
        var main_section = target_id.replace('_nav', '');
           if (e_c_p === 'e' || e_c_p === 'c') {  
            // find_name is the "name" on a button 
            elements = document.getElementsByName(find_name);
        } else if (e_c_p === 'p2' || e_c_p === 'p1') { 
            // find_name is a class name           
            elements = document.getElementsByClassName(find_name); 
        } else if (e_c_p === 'a') { 
            // the target_id is the id of the section to open with a _nav on the end
            // get the id of the section            
            var element = document.getElementById(main_section);
            // console.log('element', element)
            try {
                elements = element.children;
            } catch {
                // this is for when the hamburger shows and the user clicks it (navbar-toggler-icon is active)
                elements = []             
            }
            
        } else if (e_c_p === 'n' || e_c_p === 'o') { 
            // the outer elements when first entered 
            elements = outer_elements
        }
        // console.log('e_c_p', e_c_p)
        // console.log('elements', elements)

        // note that e and c are changing the next sibling, others changing self
        if (e_c_p === 'e' || e_c_p === 'c') {
            for (var i = 0; i <= elements.length; i++) {
                try {
                    content = elements[i].nextElementSibling;
                    $(content)[add_remove](change_class_name);
                } catch {
                }
            }
        } else if (e_c_p === 'p2' || e_c_p === 'p1' || e_c_p === 'a' || e_c_p === 'o') { 
            for (var i = 0; i <= elements.length; i++) {
                try {           
                    content = elements[i];
                    $(content)[add_remove](change_class_name);
                } catch {
                }
            }                       
        } else if (e_c_p === 'n') { 
            for (var i = 0; i <= elements.length; i++) {
                try {           
                    content = elements[i];
                    content_id = content.getAttribute('id');
                    if (content_id != main_section) {                    
                        $(content)['addClass']('d-none');
                    } 
                } catch {
                }
            } 
        }
    }
    
    // from https://datatables.net/examples/data_sources/js_array.html
    let category_tool_string_list = []
    let category = ''
    let tool_string = ''
    let prev_category = dataSet[0][0]   
    dataSet.forEach(r => {
        // for the skill list
        category = r[0]
        if (category === prev_category) {
            if (tool_string === '') {
                tool_string = r[1]
            } else {
                tool_string = tool_string + ', ' + r[1]
            }
        } else {
            category_tool_string_list.push(prev_category + ': ' + tool_string )
            tool_string = r[1]
        }
        prev_category = r[0]
       
        // for the data table - do this last
        let div1 = document.createElement('div');
        div1.innerHTML = r[1];
        r[1] = div1;
        let div3 = document.createElement('div');
        div3.innerHTML = r[3];
        r[3] = div3;
    })    
    // get the last category
    category_tool_string_list.push(prev_category + ': ' + tool_string )

    let list = document.getElementById('skills_list')    
    category_tool_string_list.forEach((item) => {
        let li = document.createElement('li');
        li.innerText = item;
        list.appendChild(li);
    })    

    new DataTable('#skills_data_table', {
        'iDisplayLength': 10,
        'order': [[0, 'asc'], [1, 'asc']],
        columns: [
            { title: 'Category' },
            { title: 'Application/Tool' },
            { title: 'Skill Level' },
            { title: 'Last Used' }
        ],
        data: dataSet
    });

    $(document).on('click', '.div-collapsible', function() {
        $(this).blur();
        change_display(this.nextElementSibling, 't');
    });

    function change_display(content, what_doing) {
        // console.log('content '+content)
        // console.log('what_doing '+what_doing)
        if (what_doing === 't') {
            if ($(content).hasClass('d-none')) {
                $(content).removeClass('d-none');
            } else {
                $(content).addClass('d-none');
                if_all_are_open_true = false;
            }
        } else if (what_doing === 'e') {
            $(content).removeClass('d-none');
        } else {
            $(content).addClass('d-none');
            if_all_are_open_true = false;
        }
    }

});
 