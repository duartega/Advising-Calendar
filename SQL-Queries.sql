use cs386_jsmith;

show tables;

select * from cs386_sanitized_advisors;
select * from cs386_students;


select * from Appointments;
select * from AdvisingTimes;
desc AdvisingTimes;

select * from AdvisingSlots;

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
  insert into AdvisingSlots values (7, 129, 3, "Friday", "8:30", "8:50", "20", null, "2017-07-04");
  select * from AdvisingSlots;
  
-- Get students registered appointments
select a. uniId, a.Day, a.StartTime, a.EndTime, a.TimeBlock from AdvisingSlots as a
join students as s on a.advisorId = s.instructor_id
where s.user_id = 5 and a.Student_ID_Registered = 5;
  
-- Get available appointment slots for the student from their advisor
select a. uniId, a.Day, a.StartTime, a.EndTime, a.TimeBlock from AdvisingSlots as a
join students as s on a.advisorId = s.instructor_id
where s.user_id = 5 and a.Student_ID_Registered is NULL;

  
  UPDATE AdvisingTimes set Student_ID_Registered = 5 where uniId = 128;
  
  select * from AdvisingTimes a
  join Appointments ap
  on a.uniId = ap.uniId
  where ap.id = 5;
  
----------------------------------------------------------------------------------------------------------

select * from AdvisingTimes;
select * from Appointments;

call updateAdvisingTimesWithStudentID(128, 5);
call deleteStudentIDFromAdvisingTimes(128, 5);
call getUnfilledAppointementSlots(5);
call getRegisteredAppointments(1);

drop procedure updateAdvisingTimesWithStudentID;
drop procedure deleteStudentIDFromAdvisingTimes;
drop procedure getUnfilledAppointementSlots;
  
----------------------------------------------------------------------------------------------------------  
  
  Delimiter //
  create procedure updateAdvisingTimesWithStudentID(_uniId int, _student_id int)
  begin
		UPDATE AdvisingTimes set Student_ID_Registered = _student_id where uniId = _uniId;
        
end //
delimiter ;
select * from AdvisingTimes;
UPDATE AdvisingSlots set Student_ID_Registered = _student_id where timeId = _uniId;

select * from users;
select * from Appointments;
show tables;
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
select * from Appointments where id = 5;
----------------------------------------------------------------------------------------------------------

-- Get all the unfilled advising appointment slots for student view
Delimiter //
create procedure getRegisteredAppointments(_instructor_id int)
begin
		-- Get registered appointment slots for the logged in advisor
		select * from AdvisingTimes where id = _instructor_id and Student_ID_Registered is not NULL;

end //
delimiter ;

select * from students;
----------------------------------------------------------------------------------------------------------

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
select * from AdvisingTimes;

select * from users;

select fname, lname from users where id = 5;

create table la (t datetime, locked bool);
drop table la;
insert into la values ("2019-05-04 15:30:59", 0);
insert into la values ("2019-11-11 13:13:13", 0);
insert into la values ("2020-11-11 13:13:13", 0);


select t, locked IF(t>SYSDATE()) from la
set locked = 1;

select sysdate();
select t as "sysdate()" from la;
select * from la;




select count(t) from la where t < sysdate();

SET SQL_SAFE_UPDATES=0;
select * from la;




DELIMITER $$ 
CREATE PROCEDURE lockAppointment()
BEGIN
		update la set locked=1 where t < sysdate();
END$$

call lockAppointment();
drop procedure lockAppointment;



