import json
import time
import codecs

def convert(member):
  print member
  return {
    "achievements" : {
      "en" : member['achievement_e'],
      "zh-hk" : member['achievement'],
      "zh-cn" : member['achievement'] 
      },
    "active" : codeActive(member['mem_status']),
    "email" : '',
    "md5_hash" : '',
    "member_id" : int(member['mem_id']),
    "member_number" : int(member['mem_num']),
    "member_since" : int(member['since_yr']),
    "name" : {
      "en" : member['eng_name'],
      "zh-hk" : member['chi_name'],
      "zh-cn" : member['chi_name']
      },
    "phone" : '',
    "pro_since" : int(member['pro_yr']),
    "profile_picture": codeAvatar(member['pic_location']),
    "qualifications": {
      "en" : member['qualification_e'],
      "zh-hk" : member['qualification'],
      "zh-cn" : member['qualification']
      },
    "role" : 'member',
    "sex" : codeSex(member['sex']),
    "status" : codeStatus(member['mem_type']),
    "created_at" : int(member['add_date']),
    "updated_at" : int(time.time()),
    "teaching_experience" : {
      "en" : member['teaching_exp_e'],
      "zh-hk" : member['teaching_exp'],
      "zh-cn" : member['teaching_exp']
      },
    "username" : codeUsername(member)
  }

codeActive = lambda x : True if x == 'Active' else False
codeSex = lambda x : 'male' if x == 'm' else 'female'
codeAvatar = lambda x : 'http://media.hkpga.com.hk/' + x
codeStatus = lambda x : ['','full','associate'][int(x)]
codeUsername = lambda x :  nameToUsername(x) if x['login_name'].isdigit() else x['login_name'].lower()
nameToUsername = lambda x : x['eng_name'].replace(' ','').lower() 

with codecs.open('members.json','r',encoding='utf8') as f:

  members= json.load(f)

  users = dict([(codeUsername(member), convert(member)) for member in members])

  with codecs.open('member_out.json','w',encoding='utf8') as out:
    out.write(unicode(json.dumps(users, ensure_ascii=False)))


