use cs386_jsmith;

show tables;

select * from Appointments;
select * from AdvisingTimes;
desc AdvisingTimes;

select * from users;

desc Appointments;
update  AdvisingTimes as a set app_date = "2017-07-04" where a.uniId = 131;

insert into Appointments values (128, 5, "a, a", "Monday", "07:30", "09:30", "This is a test insert");

ALTER TABLE AdvisingTimes
  ADD app_date date;
  

select * from users;
select * from students;

----------------------------------------------------------------------------------------------------------

-- Get the students current advisor name
select u.fname, u.lname from users as u
join students as s on s.instructor_id = u.id
where s.user_id = 5;
  
----------------------------------------------------------------------------------------------------------
  
  SELECT * FROM AdvisingTimes WHERE id = 1;
  insert into AdvisingTimes values (128, 1, "Thursday", "7:30", "7:50", "20", 1);
  
  UPDATE AdvisingTimes set Student_ID_Registered = 5 where uniId = 128;
  
  select * from AdvisingTimes a
  join Appointments ap
  on a.uniId = ap.uniId
  where ap.id = 5;
  
----------------------------------------------------------------------------------------------------------

select * from AdvisingTimes;
select * from Appointments;

call updateAdvisingTimesWithStudentIDupdateAdvisingTimesWithStudentID(128, 5);
call deleteStudentIDFromAdvisingTimes(128, 5);
call getUnfilledAppointementSlots(5);

drop procedure updateAdvisingTimesWithStudentID;
drop procedure deleteStudentIDFromAdvisingTimes;
drop procedure getUnfilledAppointementSlots;
  
----------------------------------------------------------------------------------------------------------  
  select * from AdvisingTimes;
select * from AdvisingSlots;
select * from Appointments;
SET SQL_SAFE_UPDATES = 0;
		UPDATE AdvisingSlots set Student_ID_Registered = 5 where timeId = 128;
  Delimiter //
  create procedure updateAdvisingTimesWithStudentID(_uniId int, _student_id int)
  begin
		UPDATE AdvisingSlots set Student_ID_Registered = _student_id where timeId = _uniId;
        
end //
delimiter ;

----------------------------------------------------------------------------------------------------------

-- This will delete the advising appointment that the student booked then
-- will free up the adivising appointment slot by setting the student_id_registered to null
  Delimiter //
  create procedure deleteStudentIDFromAdvisingTimes(_uniId int, _student_id int)
  begin
		UPDATE AdvisingTimes set Student_ID_Registered = NULL where uniId = _uniId;
        Delete from Appointments where uniId = _uniId and id = _student_id;
end //
delimiter ;

----------------------------------------------------------------------------------------------------------

-- Get all the unfilled advising appointment slots for student view
  Delimiter //
  create procedure getUnfilledAppointementSlots(_student_id int)
  begin
		        select a. uniId, a.Day, a.StartTime, a.EndTime, a.TimeBlock from AdvisingTimes as a
			join students as s on a.id = s.instructor_id
			where s.user_id = _student_id and a.Student_ID_Registered is NULL;
end //
delimiter ;

----------------------------------------------------------------------------------------------------------

  Delimiter //
  create procedure getUnfilledAppointementSlots(_StartTime time)
  begin
		        select a. uniId, a.Day, a.StartTime, a.EndTime, a.TimeBlock from AdvisingTimes as a
			join students as s on a.id = s.instructor_id
			where s.user_id = _student_id and a.Student_ID_Registered is NULL;
end //
delimiter ;

----------------------------------------------------------------------------------------------------------

-- some stuff for making time blocks
SELECT CONVERT(VARCHAR(10), "07:30", 104);

set @s = "07:30";
set @d = "09:30";
set @r = @s+@d;
select @r;
            
----------------------------------------------------------------------------------------------------------
select date(SYSDATE());

-- Get the current date using SYSDATE(). We are get elements before or after the current date
select * from AdvisingTimes as a
join students as s on a.id = s.instructor_id
where app_date < date(SYSDATE()) and a.Student_ID_Registered = 5
order by app_date asc;

----------------------------------------------------------------------------------------------------------
-- Get the current date using SYSDATE(). We are get elements before or after the current date
  Delimiter //
  create procedure appointmentHistory(_student_id int)
  begin
		-- Get the current date using SYSDATE(). We are get elements before or after the current date
		select * from AdvisingTimes as a
		join students as s on a.id = s.instructor_id
		where app_date < date(SYSDATE()) and a.Student_ID_Registered = 5
		order by app_date asc;
end //
delimiter ;

call appointmentHistory(5);
drop procedure appointmentHistory;

SET SQL_SAFE_UPDATES=0;

create table test (t int);
drop event lockAppointments;

CREATE EVENT lockAppointments
ON SCHEDULE EVERY 1 SECOND
STARTS CURRENT_TIMESTAMP
DO
	update la set locked=1 where t < sysdate();
    
update la set locked=1 where t BETWEEN DATE_SUB(NOW(), INTERVAL -1 DAY) and NOW();
update AdvisingTimes set isLocked = 1 where startDate < DATE_SUB(NOW(), INTERVAL -1 DAY) and NOW();
select * from AdvisingTimes;

select DATE_SUB(NOW(), INTERVAL -1 DAY);
select * from la;
drop table la;

select NOW();
select * from AdvisingTimes;

ALTER table AdvisingTimes Add islocked bool;
insert into la values ("2019-05-05 19:56:30", 0);
create table la (t datetime, locked bool);
----------------------------------------------------------------------------------------------------------
select * from Notify;
delete from Notify where userId = 5;