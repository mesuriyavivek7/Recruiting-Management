import axios from "axios";
export const keywordOptions = [
    { value: 'frontend_developer', label: 'Frontend Developer' },
    { value: 'backend_developer', label: 'Backend Developer' },
    { value: 'fullstack_developer', label: 'Full Stack Developer' },
    { value: 'react_developer', label: 'React JS Developer' },
    { value: 'angular_developer', label: 'Angular Developer' },
    { value: 'vue_developer', label: 'Vue JS Developer' },
    { value: 'nodejs_developer', label: 'Node.js Developer' },
    { value: 'java_developer', label: 'Java Developer' },
    { value: 'python_developer', label: 'Python Developer' },
    { value: 'dotnet_developer', label: '.NET Developer' },
    { value: 'php_developer', label: 'PHP Developer' },
    { value: 'ruby_developer', label: 'Ruby on Rails Developer' },
    { value: 'android_developer', label: 'Android Developer' },
    { value: 'ios_developer', label: 'iOS Developer' },
    { value: 'flutter_developer', label: 'Flutter Developer' },
    { value: 'react_native_developer', label: 'React Native Developer' },
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'devops_engineer', label: 'DevOps Engineer' },
    { value: 'qa_engineer', label: 'QA Engineer' },
    { value: 'test_automation_engineer', label: 'Test Automation Engineer' },
    { value: 'manual_tester', label: 'Manual Tester' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'product_manager', label: 'Product Manager' },
    { value: 'uiux_designer', label: 'UI/UX Designer' },
    { value: 'graphic_designer', label: 'Graphic Designer' },
    { value: 'data_analyst', label: 'Data Analyst' },
    { value: 'data_engineer', label: 'Data Engineer' },
    { value: 'data_scientist', label: 'Data Scientist' },
    { value: 'ml_engineer', label: 'Machine Learning Engineer' },
    { value: 'ai_engineer', label: 'AI Engineer' },
    { value: 'cloud_engineer', label: 'Cloud Engineer' },
    { value: 'aws_engineer', label: 'AWS Engineer' },
    { value: 'azure_engineer', label: 'Azure Engineer' },
    { value: 'gcp_engineer', label: 'GCP Engineer' },
    { value: 'database_administrator', label: 'Database Administrator' },
    { value: 'system_administrator', label: 'System Administrator' },
    { value: 'security_analyst', label: 'Security Analyst' },
    { value: 'blockchain_developer', label: 'Blockchain Developer' },
    { value: 'game_developer', label: 'Game Developer' },
    { value: 'crm_developer', label: 'CRM Developer' },
    { value: 'erp_consultant', label: 'ERP Consultant' },
    { value: 'business_analyst', label: 'Business Analyst' },
    { value: 'technical_writer', label: 'Technical Writer' },
    { value: 'seo_specialist', label: 'SEO Specialist' },
    { value: 'digital_marketer', label: 'Digital Marketer' },
    { value: 'content_writer', label: 'Content Writer' },
    { value: 'support_engineer', label: 'Support Engineer' },
    { value: 'helpdesk_technician', label: 'Helpdesk Technician' },
    { value: 'network_engineer', label: 'Network Engineer' }
  ];
  

export const fetchKeyword = async () =>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_AI_URL}/skills_titles/get_all_titles`)
      return response.data.titles.map((item)=> ({label:item,value:item.toLowerCase()}))
    }catch(err){
      console.log(err)
    }
  }